import axiosApi from './AxiosApi.js'

const apiList = {
    goodsType: {
        method: 'POST',
        url: `order-manager/business-hall/goodsType`
    },
    updateGoodsType: {
        method: 'PUT',
        url: `order-manager/business-hall/goodsType`
    },
    goodsTypeList: {
        method: 'GET',
        url: `web-manager/business-hall/goodsType/page`
    },
    getGoodsType: {
        method: 'GET',
        url: `order-manager/business-hall/goodsType`
    },
    delGoodsType: {
        method: 'DELETE',
        url: `order-manager/business-hall/goodsType`
    },
    courierList: {
        method: 'GET',
        url: `order-manager/business-hall/courier/page`
    },
    getCourier: {
        method: 'GET',
        url: `order-manager/business-hall/courier`
    },
    courierScope: {
        method: 'POST',
        url: `order-manager/business-hall/courier/scope`
    },
    getCourierScope: {
        method: 'GET',
        url: `order-manager/business-hall/courier/scope`
    }
}

export default {
    goodsType(data) {
        return axiosApi({
            ...apiList.page,
            formData: true,
            data
        })
    },
    updateGoodsType(data) {
        return axiosApi({
            ...apiList.updateGoodsType+'/'+data
        })
    },
    goodsTypeList(data) {
        return axiosApi({
            ...apiList.goodsTypeList,
            formData: true,
            data
        })
    },
    getGoodsType(data) {
        return axiosApi({
            ...apiList.getGoodsType+'/'+data
        })
    },
    delGoodsType(data) {
        return axiosApi({
            ...apiList.delGoodsType+'/'+data
        })
    },
    courierList(data) {
        return axiosApi({
            ...apiList.courierList,
            formData: true,
            data
        })
    },
    getCourier(data) {
        return axiosApi({
            ...apiList.getCourier+'/'+data
        })
    },
    courierScope (data){
        return axiosApi({
            ...apiList.courierScope,
            formData: true,
            data
        })
    },
    getCourierScope(data) {
        return axiosApi({
            ...apiList.getCourierScope+'/'+data

        })
    },
}
