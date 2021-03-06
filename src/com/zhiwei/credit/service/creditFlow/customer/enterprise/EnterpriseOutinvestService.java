package com.zhiwei.credit.service.creditFlow.customer.enterprise;

import java.util.List;

import com.zhiwei.core.service.BaseService;
import com.zhiwei.core.web.paging.PagingBean;
import com.zhiwei.credit.model.creditFlow.customer.enterprise.EnterpriseOutinvest;

public interface EnterpriseOutinvestService extends BaseService<EnterpriseOutinvest>{
	public EnterpriseOutinvest getById(Integer id);
	public List<EnterpriseOutinvest> getListByEnterpriseId(Integer enterpriseId,PagingBean pb);
}