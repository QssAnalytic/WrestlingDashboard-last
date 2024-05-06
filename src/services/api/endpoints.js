const filterEndpoints = {
  countries: `filters/countries/`,
  fighters: (country_name) => `filters/fighters/${country_name}/`,
  years: (wrestler_id) => `filters/years/${wrestler_id}/`,
  allYears: `filters/years/`,
  metricsActions: `filters/metrics-actions/`,
};

const rightFrameEndpoints = {
  medals: (fighter_id, year) => `section-right/medal-filter/?fighter_id=${fighter_id}&year=${year}`,
  fights: (fighter_id, year) =>
    `section-right/get-fight-count/?fighter_id=${fighter_id}&year=${year.filter((item) => item !== null).join(",")}`,
  points: (fighter_id, year) => `section-right/get-total-point/?fighter_id=${fighter_id}&year=${year}`,
  decisions: (fighter_id, year) => `section-right/get-decisions/?fighter_id=${fighter_id}&year=${year}`,
};

const leftFrameEndpoints = {
  metrics: (fight_date, fighter_id, metrics_name) =>
    `section-left/metrics/?fight_date=${fight_date}&fighter_id=${fighter_id}&metrics_name=${metrics_name}`,
  stats: (fight_date, fighter_id) => `section-left/stats/?fight_date=${fight_date}&fighter_id=${fighter_id}`,
  metricsChart: (metrics, fighter_id) =>
    `section-left/chart/?metrics=${metrics}&chart_name=MetricsChart&fighter_id=${fighter_id}`,
  statsChart: (stats, fighter_id, metrics) =>
    `section-left/chart/?stats=${stats}&chart_name=StatsChart&fighter_id=${fighter_id}`,
  predict: (fighter_name, opponent_name) =>
    `section-left/fighter-predict/?fighter_name=${fighter_name}&opponent_name=${opponent_name}`,
};

export { filterEndpoints, rightFrameEndpoints, leftFrameEndpoints };
