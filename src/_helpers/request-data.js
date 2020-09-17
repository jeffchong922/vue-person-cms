// xxxProp 左边代表后台需要的数据属性，右边代表组件的数据属性
const itemProp = {
  name: "name",
  icon: "imagePath"
};

const categoryProp = {
  name: "name",
  parent: "parent"
};

const articleProp = {
  content: "content",
  title: "articleTitle",
  categories: "categories"
};

const blogProp = {
  tags: "tags",
  title: "blogTitle",
  content: "content",
  createdOn: "createdAt",
  description: "blogDesc",
  modifiedOn: "modifiedAt"
};

const heroProp = {
  name: "name",
  nickName: "nickName",
  avatar: "avatar",
  bgBanner: "bgBanner",
  categories: "categories",
  scores: "scores",
  skills: "skills",
  vItems: "vItems",
  vItemsTips: "vTips",
  dItems: "dItems",
  dItemsTips: "dTips",
  usageTips: "usageTips",
  battleTips: "battleTips",
  teamTips: "teamTips",
  partners: "partners"
};

function makeGetData(dataProp) {
  return function getData(data) {
    const retVal = {};
    for (const key in dataProp) {
      const dataKey = dataProp[key];
      if (dataKey in data) {
        retVal[key] = data[dataKey];
      }
    }
    return retVal;
  };
}

function makeSetData(dataProp) {
  return function setData(context, fetchData) {
    for (const key in dataProp) {
      const dataKey = dataProp[key];
      if (dataKey in context && key in fetchData) {
        context[dataKey] = fetchData[key];
      }
    }
  };
}

const getItem = makeGetData(itemProp);
const setItem = makeSetData(itemProp);

const getCategory = makeGetData(categoryProp);
const setCategory = makeSetData(categoryProp);

const getHero = makeGetData(heroProp);
const setHero = makeSetData(heroProp);

const getArticle = makeGetData(articleProp);
const setArticle = makeSetData(articleProp);

const getBlog = makeGetData(blogProp);
const setBlog = makeSetData(blogProp);

export const requestData = Object.freeze({
  getItem,
  setItem,

  getHero,
  setHero,

  getBlog,
  setBlog,

  setCategory,
  getCategory,

  getArticle,
  setArticle
});