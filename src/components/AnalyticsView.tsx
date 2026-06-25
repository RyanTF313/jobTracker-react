import { COLUMN_LABELS, COLUMNS, calculateMetrics } from "./../constants";
import type { Job, JobStatus } from "./../types";

type AnalyticsViewProps = {
  jobs: Job[];
};

export const AnalyticsView = ({ jobs }: AnalyticsViewProps) => {
  

  const { totalJobs, counts, conversionRate, rejectionRate } =
    calculateMetrics(jobs);
  const maxCount = Math.max(...Object.values(counts), 1);

  return (
    <>
      <div className="analytics-stats">
        <div className="stat-card">
          <span className="stat-value">{totalJobs}</span>
          <span className="stat-label">Total Applications</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{conversionRate}%</span>
          <span className="stat-label">Conversion Rate</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{rejectionRate}%</span>
          <span className="stat-label">Rejection Rate</span>
        </div>
      </div>
      <div className="analytics-chart">
        <h3 className="chart-title">Applications by Stage</h3>
        <div className="bar-chart">
          {COLUMNS.map((col: JobStatus) => (
            <div key={col} className="bar-group">
              <div className="bar-wrap">
                <span className="bar-count">{counts[col]}</span>
                <div
                  className={`bar bar--${col}`}
                  style={{ height: `${(counts[col] / maxCount) * 100}%` }}
                ></div>
              </div>
              <span className="bar-label">{COLUMN_LABELS[col]}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
