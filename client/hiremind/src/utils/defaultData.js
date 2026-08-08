export const normalizeDashboardData = (data) => {
  return {
    stats: {
      totalResumes: data?.stats?.totalResumes ?? 0,
      highestATS: data?.stats?.highestATS ?? 0,
      averageATS: data?.stats?.averageATS ?? 0,
      completedAnalysis: data?.stats?.completedAnalysis ?? 0,
      processing: data?.stats?.processing ?? 0,
      latestResume: data?.stats?.latestResume ?? null,
    },

    resumes: data?.resumes ?? [],

    topSkills: data?.topSkills ?? [],

    missingSkills: data?.missingSkills ?? [],
  };
};