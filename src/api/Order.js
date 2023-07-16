import axiosApi from './AxiosApi.js'

const apiList = {
  page: {
    method: 'POST',
    url: `web-manager/order/page`
  },
  get: {
    method: 'GET',
    url: `web-manager/order/`
  },
  update: {
    method: 'POST',
    url: `web-manager/order`
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
