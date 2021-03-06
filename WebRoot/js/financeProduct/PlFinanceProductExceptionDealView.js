//PlFinanceProductExceptionDealView
//PlFinanceProductUserAccountInfo.js
/**
 * @author
 * @class PlFinanceProductIntentView
 * @extends Ext.Panel
 * @description [PlFinanceProductIntentView]管理
 * @company 智维软件
 * @createtime:
 */
PlFinanceProductExceptionDealView =  Ext.extend(Ext.Panel, {
			// 构造函数
			constructor : function(_cfg) {
				
				Ext.applyIf(this, _cfg);
				// 初始化组件
				this.initUIComponents();
				// 调用父类构造
				PlFinanceProductExceptionDealView.superclass.constructor.call(this, {
							id : 'PlFinanceProductExceptionDealView',
							region : 'center',
							layout : 'border',
							modal : true,
							height :600,
							width : 900,
							maximizable : true,
							title : '异常记录台账',
							iconCls :'btn-team30',
							items : [this.searchPanel,this.gridPanel]
						});
			},// end of constructor
			// 初始化组件
			initUIComponents : function() {
					this.searchPanel = new HT.SearchPanel({
							layout : 'column',
							style : 'padding-left:5px;padding-right:5px;padding-top:5px;',
							region : 'north',
							height : 20,
							anchor : '96%',
							keys : [{
								key : Ext.EventObject.ENTER,
								fn : this.search,
								scope : this
							}, {
								key : Ext.EventObject.ESC,
								fn : this.reset,
								scope : this
							}],
							layoutConfig: {
				               align:'middle',
				               padding : '5px'
				               
				            },
							items : [{
							         	columnWidth : .2,
										labelAlign : 'right',
										xtype : 'container',
										layout : 'form',
										labelWidth : 70,
										defaults : {
											anchor : anchor
										},
										items : [{fieldLabel : '交易日期',
											name : "dealDateS",
											format : 'Y-m-d',
											xtype : 'datefield',
											labelSeparator : ""
										}]
							         },{
							         	columnWidth : .2,
										labelAlign : 'right',
										xtype : 'container',
										layout : 'form',
										labelWidth : 70,
										defaults : {
											anchor : anchor
										},
										items : [{fieldLabel : '至',
											name : "dealDateE",
											format : 'Y-m-d',
											xtype : 'datefield',
											labelSeparator : ""
										}]
							         },{
							         	columnWidth : .2,
										labelAlign : 'right',
										xtype : 'container',
										layout : 'form',
										labelWidth : 70,
										defaults : {
											anchor : anchor
										},
										items : [{
											fieldLabel : '会员名称',
											name : "loginName",
											xtype : 'textfield',
											labelSeparator : ""
										}]
							         },{
							         	columnWidth : .2,
										labelAlign : 'right',
										xtype : 'container',
										layout : 'form',
										labelWidth : 70,
										defaults : {
											anchor : anchor
										},
										items : [{
											fieldLabel : '开户名',
											name : "userName",
											xtype : 'textfield',
											labelSeparator : ""
										}]
							         },{
										columnWidth : .1,
										xtype : 'container',
										layout : 'form',
										defaults : {
											xtype : 'button'
										},
										style : 'padding-left:10px;',
										items : [{
											text : '查询',
											scope : this,
											iconCls : 'btn-search',
											handler : this.search
										}]
									},{
										columnWidth : .1,
										xtype : 'container',
										layout : 'form',
										defaults : {
											xtype : 'button'
										},
										style : 'padding-left:10px;',
										items : [{
											text : '重置',
											scope : this,
											iconCls : 'btn-reset',
											handler : this.reset
										}]
									}]
						});
				this.topbar = new Ext.Toolbar({
					items : [ {
									iconCls : 'btn-xls',
									text : '导出到excel',
									xtype : 'button',
									scope:this,
									handler : this.exportExcel
								}]
				});
				// 初始化搜索条件Panel
				this.gridPanel = new HT.GridPanel({
					bodyStyle : "width : 100%",
					region : 'center',
					tbar : this.topbar,
					viewConfig: {  
		            	forceFit:false  
		            },
		            forceFit: true,
					// 使用RowActions
					rowActions : false,
					id : 'PlFinanceProductExceptionDealGrid',
					url : __ctxPath + "/financeProduct/listPlFinanceProductUserAccountInfo.do?dealStatus=-1",
					fields : [{
									name : 'id',
									type : 'int'
							}
							,'userId','userName','userloginName','productId','productName','currentMoney',
							'amont','dealtype','dealtypeName','dealStatus','dealStatusName','remark',
							'requestNo','dealDate'],
					columns : [{
								header : 'id',
								dataIndex : 'id',
								hidden : true
							},{
								header : '交易日期',	
								width : 150,
								align : 'center',
								format : 'Y-m-d',
								dataIndex : 'dealDate'
							},{
								header : '会员账号',
								width : 180,
								align : 'center',
								dataIndex : 'userloginName'
							},{
								header : '开户名',
								width : 180,
								align : 'center',
								dataIndex : 'userName'
							},{
								header : '产品名称',
								width : 180,
								align : 'center',
								dataIndex : 'productName'
							},{
								header : '交易金额',
								dataIndex : 'amont',
								width : 150,
								align : 'right',
								renderer:function(v){
								 	return Ext.util.Format.number(v,',000,000,000.00')+"元"
                         	    }
							},{
								header : '交易类型',	
								width : 100,
								align : 'center',
								dataIndex : 'dealtypeName'
							},{
								header : '交易流水号',
								width : 180,
								align : 'center',
								dataIndex : 'requestNo'
							},{
								header : '备注',
								width : 180,
								align : 'center',
								dataIndex : 'remark'
							}]
					});

				 //this.gridPanel.addListener('rowdblclick',this.rowClick);

			},
			// 重置查询表单

		reset : function() {
				this.searchPanel.getForm().reset();
				var obj = Ext.getCmp('Q_fundType_N_EQ');
				var arrStore= new Ext.data.SimpleStore({});
				obj.clearValue();
                obj.store = arrStore;
			    arrStore.load({"callback":test});
			    function test(r){
			    	if (obj.view) { // 刷新视图,避免视图值与实际值不相符
			    		obj.view.setStore(arrStore);
			        }
			   }
			},
			// 按条件搜索
			search : function() {
				$search({
							searchPanel : this.searchPanel,
							gridPanel : this.gridPanel
						});
			},
		
				exportExcel:function(){
					var userName=this.searchPanel.getCmpByName('userName').getValue();
					var loginName=this.searchPanel.getCmpByName('loginName').getValue();
					
					var dealDateS=this.searchPanel.getCmpByName('dealDateS').getValue();
					var dealDateE=this.searchPanel.getCmpByName('dealDateE').getValue();
					window.open( __ctxPath + "/financeProduct/exportExceptionToExcelPlFinanceProductUserAccountInfo.do?dealStatus=-1&userName"+userName+"&loginName="+loginName+"&dealDateS="+dealDateS+"&dealDateE="+dealDateE);
	},
			openliushuiwin : function() {}
		});


