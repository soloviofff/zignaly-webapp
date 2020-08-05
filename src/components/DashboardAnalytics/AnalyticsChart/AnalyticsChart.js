import React, { useState } from "react";
import { Paper, Box, Typography, useMediaQuery, CircularProgress } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import BarChart from "../../Graphs/BarChart";
import { FormattedMessage } from "react-intl";
import "./AnalyticsChart.scss";
import { formatFloat2Dec } from "../../../utils/format";

/**
 * @typedef {import("../../../services/tradeApiClient.types").ProfileStatsObject} ProfileStatsObject
 * @typedef {import('chart.js').ChartTooltipItem} ChartTooltipItem
 */

/**
 * @typedef {Object} DefaultProps
 * @property {Array<ProfileStatsObject>} stats Table stats data.
 * @property {string} quote Selected quote (base currency).
 * @property {string} timeFrame Selected time frame.
 * @property {Boolean} loading
 */

/**
 * Dashboard analytics chart to display profits.
 *
 * @param {DefaultProps} props Component properties.
 * @returns {JSX.Element} Component JSX.
 */
const AnalyticsChart = ({ stats, timeFrame, quote, loading }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [tabValue, setTabValue] = useState(0);

  /**
   * @type {'profitFromInvestmentPercentage'|'profit'}
   */
  let key = "profitFromInvestmentPercentage";
  let unit = "%";
  if (tabValue === 1) {
    key = "profit";
    unit = quote;
  }

  const values = [...stats].map((s) => s[key]);
  const labels = [...stats].map((s) => s.date);
  const options = {};

  /**
   * @param {ChartTooltipItem} tooltipItems Tooltip item.
   * @returns {string} Tooltip text.
   */
  const tooltipFormat = (tooltipItems /* data */) =>
    `${formatFloat2Dec(tooltipItems[isMobile ? "xLabel" : "yLabel"])} ${unit}`;

  return (
    <Paper className="providersProfitsChart">
      <Box
        className="profitsHeader"
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="row">
          <Typography
            className={tabValue === 0 ? "selected" : null}
            onClick={() => setTabValue(0)}
            variant="h4"
          >
            <FormattedMessage id="srv.profitspercentage" />
          </Typography>
          <Typography
            className={tabValue === 1 ? "selected" : null}
            onClick={() => setTabValue(1)}
            variant="h4"
          >
            <FormattedMessage id="srv.netprofit" />
          </Typography>
        </Box>
        <Typography variant="h3">{`${timeFrame} / ${quote}`}</Typography>
      </Box>
      {loading && (
        <Box
          className="loadingBox"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress color="primary" size={40} />
        </Box>
      )}
      {!loading && (
        <BarChart
          adjustHeightToContent={isMobile}
          horizontal={isMobile}
          labels={labels}
          options={options}
          tooltipFormat={tooltipFormat}
          values={values}
        />
      )}
    </Paper>
  );
};
export default AnalyticsChart;
