import axiosApi from './AxiosApi.js'

const apiList = {
  page: {
    method: 'POST',
    url: `order-manager/order/page`
  },
  get: {
    method: 'GET',
    url: `order-manager/order/`
  },
  update: {
    method: 'POST',
    url: `order-manager/order`
  },
}

export default {
    page (data) {
    return axiosApi({
      ...apiList.page,
      formData: true,
      data
    })
  },
  get (data) {
    return axiosApi({
      ...apiList.get,
      data
    })
  },
  update (data) {
    return axiosApi({
      ...apiList.update,
      data
    })
  },
}
