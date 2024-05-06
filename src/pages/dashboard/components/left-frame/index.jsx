import OveralScore from "./components/overal-score";
import Select from "../../../../components/filter/components/select";
import useSWR from "swr";
import { filterEndpoints, leftFrameEndpoints } from "../../../../services/api/endpoints";
import { getData } from "../../../../services/api/requests";
import { useContext, useEffect, useState } from "react";
import { FilterContext } from "../../../../context/FilterContext";
import SummaryStats from "./components/summary-stats";
import ScorecardMetrics from "./components/score-card-metrics";
import { MetricActions } from "../../../types";
import { useTranslation } from "react-i18next";
import ScoresByYears from "./components/scores-by-years";
import OffenceStatsByYears from "./components/offence-stats-by-years";
import OverallScoresByYears from "./components/overal-scores-by-years";

const LeftFrame = () => {
  const { filterParams, setFilterParams, setFilterDialog, filterDialog } = useContext(FilterContext);
  const { t } = useTranslation();
  const [scoreByYears, setScoreByYears] = useState([]);

  // Current Wrestler find fn
  const { data: fighters } = useSWR(
    filterParams?.country ? filterEndpoints.fighters(filterParams?.country) : null,
    getData,
  );
  const currentWrestler = fighters?.find((item) => item.id === filterParams?.wrestler)?.data;


  // Summary Stats and ScoreCard Metrics data fetching
  const { data: newMetrics, isLoading: metricsLoading } = useSWR(
    filterParams?.years?.length > 0 && filterParams?.wrestler && filterParams?.action_name
      ? leftFrameEndpoints.metrics(filterParams?.years, filterParams?.wrestler, filterParams?.action_name)
      : null,
    getData,
  );

  const { data: scoreCardMetrics, isLoading: statsLoading } = useSWR(
    filterParams?.years?.length > 0 && filterParams?.wrestler
      ? leftFrameEndpoints.stats(filterParams?.years, filterParams.wrestler)
      : null,
    getData,
  );

  const { data: metricsChart } = useSWR(
    filterParams?.metrics && filterParams?.wrestler
      ? leftFrameEndpoints.metricsChart(filterParams?.metrics, filterParams?.wrestler)
      : null,
    getData,
  );

  console.log("metricsChart", metricsChart);

  // Default value for stats

  useEffect(() => {
    setFilterParams((prev) => ({
      ...prev,
      stats: metricsChart?.stats_list?.[0],
    }));
  }, [filterParams?.metrics, metricsChart]);

  const convertedStats = metricsChart?.stats_list?.map((item) => ({
    data: item,
  }));

  // Stats chart query

  const { data: statsChart } = useSWR(
    filterParams?.wrestler && filterParams?.stats
      ? leftFrameEndpoints?.statsChart(filterParams?.stats, filterParams?.wrestler)
      : null,
    getData,
  );

  // Scores by years

  const { data: years } = useSWR(
    filterParams?.wrestler ? filterEndpoints.years(filterParams?.wrestler) : null,
    getData,
  );

  // const { data: forScores, mutate : getScores } = useSWRMutation(leftFrameEndpoints.stats(year?.data, filterParams.wrestler), getData);

  // for (let year in years) {
  //   let scoreByYear = {};

  //   console.log("for score", year.data, forScores);
  //   const percentage = forScores?.reduce((acc, next) => {
  //     return Math.floor(acc + (next?.score * 100) / forScores.length);
  //   }, 0);

  //   scoreByYear = { year: year.data, score: percentage };

  //   setScoreByYears((prev) => [...prev, scoreByYear]);
  // }

  useEffect(() => {
    const fetchScores = async () => {
      const scores = [];

      for (let year of years) {
        if (year?.data && filterParams?.wrestler) {
          try {
            const forScores = await getData(leftFrameEndpoints.stats(year?.data, filterParams.wrestler));
            console.log("for score", year.data, forScores);

            if (forScores) {
              const percentage = forScores.reduce((acc, next) => {
                return Math.floor(acc + (next?.score * 100) / forScores.length);
              }, 0);

              scores.push({ year: year.data, score: percentage });
            } else {
              console.log("No data found for", year.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      }

      setScoreByYears(scores);
    };

    fetchScores();
  }, [years, filterParams]);

  // years && years?.map((year) => {});

  console.log("score card", scoreByYears);

  // Scores by years logic

  // const { data: defenceScore } = useSWR(
  //   filterParams?.metrics && filterParams?.wrestler
  //     ? leftFrameEndpoints.metricsChart("Defence Score", filterParams?.wrestler)
  //     : null,
  //   getData,
  // );

  // const { data: offenceScore } = useSWR(
  //   filterParams?.metrics && filterParams?.wrestler
  //     ? leftFrameEndpoints.metricsChart("Offence Score", filterParams?.wrestler)
  //     : null,
  //   getData,
  // );

  // const { data: takedownScore } = useSWR(
  //   filterParams?.metrics && filterParams?.wrestler
  //     ? leftFrameEndpoints.metricsChart("Takedown Score", filterParams?.wrestler)
  //     : null,
  //   getData,
  // );
  // const { data: durabilityScore } = useSWR(
  //   filterParams?.metrics && filterParams?.wrestler
  //     ? leftFrameEndpoints.metricsChart("Durability Score", filterParams?.wrestler)
  //     : null,
  //   getData,
  // );

  // const collectedDts = {
  //   takedown: takedownScore?.data,
  //   offence: offenceScore?.data,
  //   defence: defenceScore?.data,
  //   durability : durabilityScore?.data
  // };

  // const years = new Set(); // Unique years from collected datas
  // Object.values(collectedDts)?.map((arr) => arr?.map((item) => years.add(item.year)));

  // console.log("all dts", collectedDts);
  // console.log("unique years", Array.from(years));

  // //  Data Cleaning
  // function arrayDifference(arr1, arr2) {
  //   let diff = [];

  //   for (let i = 0; i < arr1.length; i++) {
  //     if (arr2?.indexOf(arr1[i]) === -1) {
  //       diff.push(arr1[i]);
  //     }
  //   }
  //   return diff;
  // }

  // const ty = Object.values(collectedDts)?.map((actions) => {
  //   const difference = arrayDifference(
  //     Array.from(years),
  //     actions?.map((action) => action.year),
  //   );
  //   return difference.length > 0 ? difference?.map((year) => actions.push({ year: year, score: 0 })) : actions;
  // });

  // let mergedArray = ty?.reduce((acc, curr) => acc.concat(curr), []);

  // mergedArray?.sort((a, b) => a.year - b.year);

  // let sortedData = [];
  // let currentYear = null;
  // let currentArray = null;

  // mergedArray.forEach((obj) => {
  //   if (obj?.year !== currentYear) {
  //     currentYear = obj?.year;
  //     currentArray = [];
  //     sortedData.push(currentArray);
  //   }
  //   currentArray.push(obj);
  // });

  // console.log('collected',collectedDts)

  // const score_by_years = sortedData.map((item) => ({
  //   year: item[0]?.year,
  //   score: Math.round(item.reduce((acc, curr) => acc + curr?.score, 0) / 4),
  // }));
 
  return (
    <section className="h-[100%]">
      <h1 className="font-customweight leading-5 tracking-wider font-inter text-center  text-[#ECC254] pt-2 pb-4">
        <span className="border-b-[2px] border-b-[#ECC254]">{t(`Inside the ring: Tactical Evaluation`)}</span>
      </h1>

      <div className="border border-[#ECC254] h-[854px] rounded flex p-4 gap-4">
        <div className="flex flex-col gap-2">
          <OveralScore data={scoreCardMetrics} currentWrestler={currentWrestler} />
          <ScorecardMetrics data={scoreCardMetrics} isLoading={statsLoading} />
          <Select
            id={"action_name"}
            name={"Offence stats"}
            data={MetricActions}
            value={filterParams}
            setValue={setFilterParams}
            filterDialog={filterDialog}
            setFilterDialog={setFilterDialog}
          />
          <SummaryStats data={newMetrics?.metrics_list} isLoading={metricsLoading} />
        </div>

        <div className="flex flex-col gap-3">
          <OverallScoresByYears data={scoreByYears} />
          <Select
            id={"metrics"}
            name={"Offence stats"}
            data={MetricActions}  
            value={filterParams}
            setValue={setFilterParams}
            filterDialog={filterDialog}
            setFilterDialog={setFilterDialog}
          />
          <ScoresByYears data={metricsChart?.data} />
          <Select
            id={"stats"}
            name={"Offence stats"}
            data={convertedStats}
            value={filterParams}
            setValue={setFilterParams}
            filterDialog={filterDialog}
            setFilterDialog={setFilterDialog}
          />
          <OffenceStatsByYears data={statsChart} />
        </div>
      </div>
    </section>
  );
};

export default LeftFrame;
