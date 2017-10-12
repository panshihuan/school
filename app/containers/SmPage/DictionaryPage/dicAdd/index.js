import React, { PropTypes } from 'react';
import pubsub from 'pubsub-js'
import { Link } from 'react-router';
import AppTable from 'components/AppTable';
import AppButton from 'components/AppButton'
import InputNumberField from 'components/Form/InputNumberField'
import {reduxForm, Field, FieldArray} from 'redux-form/immutable';
import {Row, Col} from 'antd'
import TextField from 'components/Form/TextField'

export class DicAddModal extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }
    componentDidMount() {
        // pubsub.publish('orderRepealModal-table-11.laterData',{})
    }
    componentWillUnmount() {
    }
    componentWillReceiveProps(nextProps) {
    }
    render() {
        return (
            <form>
                <Row>
                    <Col span={12}>
                        <Field config={{
                            enabled: true,
                            id: "code",
                            label: "字典",  //标签名称
                            labelSpan: 8,   //标签栅格比例（0-24）
                            wrapperSpan: 16,  //输入框栅格比例（0-24）
                            form: "DicAddModal",
                            showRequiredStar: true,  //是否显示必填星号
                            placeholder: "请输入编码"
                        }} component={TextField} name="code" />
                    </Col>
                    <Col span={12}>
                        <Field config={{
                            enabled: true,
                            id: "name",
                            label: "字典名称",  //标签名称
                            labelSpan: 8,   //标签栅格比例（0-24）
                            wrapperSpan: 16,  //输入框栅格比例（0-24）
                            form: "DicAddModal",
                            showRequiredStar: true,  //是否显示必填星号
                            placeholder: "请输入名称"
                        }} component={TextField} name="name" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <Field config={{
                            enabled: true,
                            id: "description",
                            label: "说明",  //标签名称
                            labelSpan: 8,   //标签栅格比例（0-24）
                            wrapperSpan: 16,  //输入框栅格比例（0-24）
                            form: "DicAddModal",
                            showRequiredStar: true,  //是否显示必填星号
                            placeholder: "请输入说明"
                        }} component={TextField} name="description" />
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={20}>
                        {/*取消按钮*/}
                        <AppButton config={{
                            id: "orderRepealModal-btn-3",
                            title: "取消",
                            type:"default",
                            size:"large",
                            visible: true,
                            enabled: true,
                            subscribes: [
                                {
                                    event: "orderRepealModal-btn-3.click",
                                    pubs:[{
                                        event: "addDicPage.onCancel",
                                    }]
                                }
                            ]
                        }} />

                        {/*确定按钮*/}
                        <AppButton config={{
                            id: "orderRepealModal-btn-2",
                            title: "确定",
                            type:"primary",
                            size:"large",
                            visible: true,
                            enabled: true,
                            subscribes: [
                                {
                                    event: "orderRepealModal-btn-2.click",
                                    pubs:[
                                        {
                                            event: "orderRepealModal-btn-2.expression",
                                            meta: {
                                                expression:
                                                    `
                                                    console.log("删除111");
                                                    resolveFetch({fetch:{id:"DicAddModal",data:"@@formValues"}}).then(function (value) {
                                                         console.log(value);

                                                        //刷新表格
                                                        let params = {
                                                        }

                                                        let dataSource= {
                                                          type: "api",
                                                          method: "POST",
                                                          url: "/sm/dictionaryEnum/add.action"
                                                        };

                                                        resolveDataSourceCallback(
                                                            {
                                                                dataSource:dataSource,eventPayload:value,dataContext:value
                                                            },
                                                          function(res){
                                                            //me.setState({dataSource:res.data})
                                                          },
                                                          function(){
                                                          }
                                                        )
                                                    });
                                                `
                                            }
                                        },
                                        {
                                            event: "dic.loadData",
                                        },
                                        {
                                            event: "addDicPage.onCancel",
                                        }
                                    ]
                                }
                            ]

                        }} />


                    </Col>
                </Row>
            </form>
        );
    }
}

DicAddModal.propTypes = {

};

export default  reduxForm({
    form: "DicAddModal",
})(DicAddModal);

