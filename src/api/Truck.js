import axiosApi from './AxiosApi.js'

const apiList = {
  saveTruckType: {
    method: 'POST',
    url: `/web-manager/transfor-center/bussiness/truckType`
  },
  updateTruckType: {
    method: 'PUT',
    url: `/web-manager/transfor-center/bussiness/truckType`
  },
  truckTypelist: {
    method: 'GET',
    url: `/web-manager/transfor-center/bussiness/truckType/page`
  },
  getTruckType: {
    method: 'GET',
    url: `/web-manager/transfor-center/bussiness/truckType/`
  },
  delTruckType: {
    method: 'DELETE',
    url: `/web-manager/transfor-center/bussiness/truckType/`
  },
  saveFleet: {
    method: 'POST',
    url: `/web-manager/transfor-center/bussiness/fleet/`
  },
  upFleet: {
    method: 'PUT',
    url: `/web-manager/transfor-center/bussiness/fleet/`
  },
  fleetList: {
    method: 'GET',
    url: `/web-manager/transfor-center/bussiness/fleet/page`
  },
  getFleet: {
    method: 'GET',
    url: `/web-manager/transfor-center/bussiness/fleet/`
  },
  delFleet: {
    method: 'DELETE',
    url: `/web-manager/transfor-center/bussiness/fleet/`
  },
  delTruckType: {
    method: 'DELETE',
    url: `/web-manager/transfor-center/bussiness/truckType/`
  },
  saveTruck: {
    method: 'POST',
    url: `/web-manager/transfor-center/bussiness/truck/`
  },
  upTruck: {
    method: 'PUT',
    url: `/web-manager/transfor-center/bussiness/truck/`
  },
  truckList: {
    method: 'GET',
    url: `/web-manager/transfor-center/bussiness/truck/page`
  },
  getTruck: {
    method: 'GET',
    url: `/web-manager/transfor-center/bussiness/truck/`
  },
  delTruck: {
    method: 'DELETE',
    url: `/web-manager/transfor-center/bussiness/truck/`
  },
  delTruckType: {
    method: 'DELETE',
    url: `/web-manager/transfor-center/bussiness/truckType/`
  }
}

export default {
  saveTruckType (data) {
    return axiosApi({
      ...apiList.saveTruckType,
      data
    })
  },
  updateTruckType (id,data) {
    const api = {
      method:apiList.updateTruckType.method,
      url : apiList.updateTruckType.url +'/'+ id
    }
    return axiosApi({
      ...api,data
    })
  },
  truckTypelist (data) {
    return axiosApi({
      ...apiList.truckTypelist,
      data
    })
  },
  getTruckType (data) {
    return axiosApi({
      ...apiList.getTruckType+data
    })
  },
  delTruckType (data) {
    const api = {
      method:apiList.delTruckType.method,
      url : apiList.delTruckType.url +'/'+ data
    }
    return axiosApi({
      ...api
    })
  },
  saveFleet (data) {
    return axiosApi({
      ...apiList.saveFleet,
      data
    })
  },
  updateFleet (id,data) {
    const api = {
      method:apiList.updateFleet.method,
      url : apiList.updateFleet.url +'/'+ id
    }
    return axiosApi({
      ...api,data
    })
  },
  Fleetlist (data) {
    return axiosApi({
      ...apiList.fleetList,
      data
    })
  },
  getFleet (data) {
    return axiosApi({
      ...apiList.getFleet+data
    })
  },
  delFleet (data) {
    const api = {
      method:apiList.delFleet.method,
      url : apiList.delFleet.url +'/'+ data
    }
    return axiosApi({
      ...api
    })
  },
  saveTruck (data) {
    return axiosApi({
      ...apiList.saveTruck,
      data
    })
  },
  updateTruck (id,data) {
    const api = {
      method:apiList.updateTruck.method,
      url : apiList.updateTruck.url +'/'+ id
    }
    return axiosApi({
      ...api,data
    })
  },
  truckList (data) {
    return axiosApi({
      ...apiList.truckList,
      data
    })
  },
  getTruck (data) {
    return axiosApi({
      ...apiList.getTruck+data
    })
  },
  delTruck (data) {
    const api = {
      method:apiList.delTruck.method,
      url : apiList.delTruck.url +'/'+ data
    }
    return axiosApi({
      ...api
    })
  }
}
