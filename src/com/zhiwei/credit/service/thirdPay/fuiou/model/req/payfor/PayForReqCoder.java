package com.zhiwei.credit.service.thirdPay.fuiou.model.req.payfor;

import java.io.StringReader;
import java.io.StringWriter;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;

public class PayForReqCoder{
    private static String CHARSET = "UTF-8";
    private static JAXBContext jaxbContext;

    static{
        try{
            jaxbContext = JAXBContext.newInstance("com.zhiwei.credit.service.thirdPay.fuiou.model.req.payfor");
        }catch(JAXBException e){
            // this is a deployment error
            throw new Error(e);
        }
    }

    public static String marshal(PayForReqType payForReqType) throws JAXBException{
        Marshaller m = jaxbContext.createMarshaller();
        m.setProperty(Marshaller.JAXB_ENCODING, CHARSET);
        m.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, new Boolean(false));
        JAXBElement<PayForReqType> jaxbElement = (new ObjectFactory()).createPayforreq(payForReqType);
        StringWriter sw = new StringWriter();
        m.marshal(jaxbElement, sw);
        return sw.toString();
    }

    public static PayForReqType unmarshal(String xml) throws JAXBException{
        Unmarshaller u = jaxbContext.createUnmarshaller();
        StringReader sw = new StringReader(xml);
        JAXBElement<?> element = (JAXBElement<?>) u.unmarshal(sw);
        PayForReqType payForReqType = (PayForReqType) element.getValue();
        return payForReqType;
    }
}
