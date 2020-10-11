import Api, { parseData } from "@/shared/api/index";

export const getCompanies = () => {
  return Api()
    .request({
      url: `/company_service/get_companies`,
      method: `get`,
    })
    .then(parseData);
};

export const addOrUpdateCompany = (config) => {
  return Api().put("/company_service/update", config).then(parseData);
};

export const deleteCompany = (companyList) => {
  return Api()
    .request({
      url: "/company_service/delete",
      method: "delete",
      params: {
        companyIds: companyList.map((el) => el.companyId).join(","),
      },
    })
    .then(parseData);
};
