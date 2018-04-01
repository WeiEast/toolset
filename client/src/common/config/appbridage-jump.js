var jump = {
	// 红包
	redBag: {
		type: "redBag",
		data: {},
		feature: 'GOTO_MY_RED_PACKETS',
	},
	// 社区首页
	communityList: {
		type: 'communityList',
		data: {},
		feature: 'GOTO_COMMUNITY_ENTRY',
	},
	// 直播 培训
	liveMain: {
		type: 'liveMain',
        data: {},
        feature: 'NATIVE_VIEW_WORMHOLE',
	},
	// 专题
	topic: {
		type: 'topic',
		data: { turnType: 2, contentType: 1, contentId: 112002, newsType: 1, isFromRecommend: true },
		feature: 'NATIVE_VIEW_WORMHOLE',
    },
	// 宝石明细
	myGem: {
		type: 'myGem',
		data: {},
		feature: 'GOTO_MY_GEM',
	},
	// 计划书首页
	planbookHome: {
		type: 'planbookHome',
		data: {},
		feature: 'GOTO_PLANBOOK_HOME',
	},
	// 实名认证
	realNameAuth: {
		type: 'realNameAuth',
		data: {},
		feature: 'GOTO_REAL_NAME_AUTH',
	},
	// 个险商城
	generalInsuranceMall: {
		type: "generalInsuranceMall",
		data: { categoryId: 0, companyId: 0, categoryName: '全部', companyName: '全部' },
		feature: 'INSURANCE_MALL_NATIVE',
	},
	// 车险商城
	carInsuranceMall:{
		type: "carInsuranceMall",
		data: {},
		feature: 'INSURANCE_MALL_NATIVE',
	},
	// 学习板块
	studySection: {
		type: 'studySection',
		data: {sectionId: "27", sectionName: "全部", sectionType: "0"},
		feature: 'GOTO_STUDY_SECTION',
	}
}


module.exports = jump;