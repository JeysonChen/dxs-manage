/**
 * @file global api urls
 * 使用adapter:
 *      adapterExample:{
 *          url: 'url',
 *          rules: {
 *              req:{
 *                  value:[
 *                      {
 *                          to:'testId',
 *                          value: '123'
 *                      }
 *                  ]
 *              },
 *              res:{
 *                  index:[
 *                      {
 *                          to: 'testNo',
 *                          from: 'errNo'
 *                      }
 *                  ]
 *              }
 *          }
 *      }
 */

import http from 'axios';
// import {DetaAdapter} from 'api-adapt';
// import {prefix} from './prefix';
// import {EventBus} from '../event/custom-event';

export default api => {
    let method = api.method === 'post' ? 'post' : 'get';
    let pathExp = /(?:\$\{)([a-zA-Z0-9]+)(?:\})/gi;
    let matches = api.url.match(pathExp);

    api.variables = matches ? matches.map(item => item.substring(2, item.length - 1)) : [];

    return (params, Option = {}) => {
        // 这个应该最先被执行
        // if (!(params instanceof FormData)) {
        //     params = params && new DateAdapter(params, api.rules && api.rules.req);
        // }

        if (api.url.indexOf('${') > -1) {
            // 对${xxx}的替换
            // eslint-disable-next-line
            let fn = new Function('params', 'with(params) {return `'+api.url+'`}');
            api.ruUrl = fn(params);
        }

        // 删除params中被${xxx}替换掉的变量
        api.variables.forEach(item => {
            delete params[item];
        });

        let {path, payload} = Option;
        let localUrl = api.reUrl || api.url;
        let url = path ? localUrl + path : localUrl;
        // if (!api.noPrefix) {
        //     url = prefix + url;
        // }

        return http.request({
            url,
            method,
            ...payload,
            [method === 'get' ? 'params' : 'data']: params
        }).then(({data}) => {
            // 0 是ok
            // 1 是用户错误
            // -1 服务器端错误
            if (data.status === 200) {
                console.log(data, 200);
                // let rules = api.rules && api.rules.res;
                // return rules ? new DateAdapter(data, rules) : data;
                return Promise.resolve(data);
            } else {
                console.log(data, 999)
                return Promise.reject(data);
            }
        }).catch(res => {
            return Promise.reject(res);
            // if (http.isCancle(res)) {
            //     console.log('Request canceled', res.message);
            // } else {
            //     if (res && res.status !== 0) {
            //         if (typeof (res) === 'string' && res.includes('403')) {
            //             window.location.href = '/common/403.jsp';
            //         } else {
            //             EventBus.$toast.error(res.message);
            //             console.error(`errNo: ${res.status}, message:${res.message}`);
            //         }
            //     }
            //     return Promise.reject(res);
            // }

        });


    };


};


