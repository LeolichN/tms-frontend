import axiosApi from './AxiosApi.js'

const apiList = {
  page: {
    method: 'POST',
    url: `/web-manager/transport-task-manager/page`
  },
  get: {
    method: 'GET',
    url: `/web-manager/transport-task-manager/`
  },
  getPoint: {
    method: 'GET',
    url: `/web-manager/transport-task-manager/point/`
  },
  update: {
    method: 'PUT',
    url: `/web-manager/transport-task-manager/`
  }
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
    const api = {
      method:apiList.get.method,
      url : apiList.get.url +'/'+ data
    }
    return axiosApi({
      ...api,
      data
    })
  },
  getPoint (data) {
    const api = {
      method:apiList.getPoint.method,
      url : apiList.getPoint.url +'/'+ data
    }
    return axiosApi({
      ...api,
      data
    })
  },
  update (id,data) {
    const api = {
      method:apiList.update.method,
      url : apiList.update.url +'/'+ id
    }
    return axiosApi({
      ...api,
      data
    })
  }
}
