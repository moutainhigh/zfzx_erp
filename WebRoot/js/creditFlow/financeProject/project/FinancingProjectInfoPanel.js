/**
 * @author lisl
 * @class FinancingProjectInfoPanel
 * @description 融资项目详细信息页面
 * @extends Ext.Panel
 */
FinancingProjectInfoPanel = Ext.extend(Ext.Panel, {
	constructor : function(_cfg) {
		if(typeof(_cfg.isHidden)!="undefined"){
			this.isHidden=_cfg.isHidden
		}
		Ext.applyIf(this, _cfg);
		this.initUIComponents();
		FinancingProjectInfoPanel.superclass.constructor.call(this, {
			id : 'FinancingProjectInfo_' + this.record.data.projectId,//id属性值前缀通过是否包含"Edit"来区分查看和编辑页面
			title : this.isHidden==true?false:"项目详细-" + this.record.data.projectNumber,
			iconCls: 'btn-detail',
			autoHeight : true,
			items : []
		});
	},
	initUIComponents : function() {
		var jsArr = [
			__ctxPath + '/js/creditFlow/finance/calculateFundIntent.js',
			__ctxPath + '/js/creditFlow/finance/calulateFinancePanel.js',
			__ctxPath + '/js/creditFlow/finance/caluateIntentGrid.js',
			__ctxPath + '/js/creditFlow/finance/calulateloadDataCommon.js',
			__ctxPath
					+ '/js/creditFlow/financeProject/project/FinancingProjectInfo.js'// 项目信息
		];
		$ImportSimpleJs(jsArr, this.constructPanel, this);

	},// 初始化组件
	constructPanel : function() {
		// 项目信息导航
		this.financingProjectInfoNavigation = new FinancingProjectInfoNavigation({
			record : this.record,
			flag : "see" // edit表示编辑页面,see表示查看页面
		});
		// 项目信息
		this.projectInfo = new FinancingProjectInfo({
			record : this.record
		});
		this.outPanel = new Ext.Panel({
			modal : true,
			buttonAlign : 'center',
			layout : 'form',
			frame : true,
			defaults : {
				anchor : '100%',
				columnWidth : 1,
				collapsible : false
			},
			labelAlign : "right",
			items : [{
				xtype : 'panel',
				height : 90,
				title : '<font class="x-myZW-fieldset-title">项目总览(</font><font color="red">注：带图标按钮为弹窗式操作按钮，其余均为项目信息部分快速定位操作按钮</font><font class="x-myZW-fieldset-title">)</font>',
				collapsible : true,
				items : [this.financingProjectInfoNavigation],
				listeners : {
					scope : this,
					"collapse" : function(panel) {
						this.projectInfo.setHeight(document.body.clientHeight - 185 + 65);//项目信息部分面板最初的高度加上收缩起来的面板的高度
						this.doLayout();
					},
					"expand" : function(panel) { 
						var nowHeight = this.projectInfo.getHeight();
						this.projectInfo.setHeight(nowHeight - 65);//项目信息部分面板当前的高度减去收缩起来的面板的高度
						this.doLayout();
					}
				}
			}, {
				xtype : 'panel',
				layout : 'form',
				layoutConfig : {
					padding : '5',
					pack : 'center',
					align : 'middle'
				},
				items : [this.projectInfo]
			}]
		});
		this.add(this.outPanel);
		this.doLayout();
	}// 初始化UI结束
});