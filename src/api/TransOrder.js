import axiosApi from './AxiosApi.js'

const apiList = {
  page: {
    method: 'POST',
    url: `/web-manager/transport-order-manager/page`
  },
  get: {
    method: 'GET',
    url: `/web-manager/transport-order-manager/`
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
}
