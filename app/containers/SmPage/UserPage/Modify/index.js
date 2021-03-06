/*
 *
 * Modify
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Breadcrumb, Row, Card, Col, Tabs } from 'antd';
import { Link } from 'react-router';
import pubsub from 'pubsub-js'
import Immutable from 'immutable'

import TextField from 'components/Form/TextField'
import RadiosField from 'components/Form/RadiosField'
import AutoCompleteField from 'components/Form/AutoCompleteField'
import CheckBoxField from 'components/Form/CheckBoxField'
import DateField from 'components/Form/DateField'
import InputNumberField from 'components/Form/InputNumberField'
import SelectField from 'components/Form/SelectField'
import SwitchField from 'components/Form/SwitchField'
import TableField from 'components/Form/TableField'
import TextAreaField from 'components/Form/TextAreaField'
import UploadField from 'components/Form/UploadField'
import AppButton from "components/AppButton"
import FindbackField from 'components/Form/FindbackField'
import { resolveDataSource, publishEvents, resolveFetch } from 'utils/componentUtil'
import { reduxForm, Field, FieldArray } from 'redux-form/immutable'

const TabPane = Tabs.TabPane;
const validate = values => {
  const errors = {}
  if (!values.get('userCode')) {
    errors.code = '必填项'
  }
  if (!values.get('userName')) {
      errors.code = '必填项'
  }
  return errors
}


class Modify extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    id = "";
  constructor(props) {
    super(props);
      //debugger
    pubsub.subscribe("planNum2.onChange", (name, payload) => {
      pubsub.publish("@@form.change", { id: "modify", name: "actualQty", value: payload })
    })
    let modifyId = this.props.location.state[0].gid;
    let modifyData = this.props.location.state[0]
    this.id=modifyId;
    pubsub.publish("@@form.init", { id: "modify", data: Immutable.fromJS(modifyData) })
  }

  componentWillMount() {
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
  componentWillReceiveProps(nextProps) {
  }

  render() {
    return (
      <div>
        <Breadcrumb className="breadcrumb" separator=">">
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>角色管理</Breadcrumb.Item>
          <Breadcrumb.Item>修改</Breadcrumb.Item>
        </Breadcrumb>
        <Card style={{ width: "100%", backgroundColor: "#f9f9f9" }} bodyStyle={{ padding: "15px" }}>
          <Row>
            <Col>
              <AppButton config={{
                id: "UserSaveBtn",
                title: "保存",
                visible: true,
                enabled: true,
                type: "primary",
                subscribes: [
                  {
                    event: "UserSaveBtn.click",
                    behaviors: [
                      {
                        type: "request",
                        dataSource: {
                          type: "api",
                          method: "POST",
                          url: "/sm/user/modify.action?id="+this.id,
                          withForm: "modify",
                        },
                        successPubs: [  //获取数据完成后要发送的事件
                          {
                            event: "@@navigator.push",
                            payload: {
                              url: "/user"
                            }
                          }, {
                            event: "@@message.success",
                            payload: "修改成功"
                          }
                        ],
                        errorPubs: [
                          {
                            event: "@@message.error",
                            payload: "修改失败"
                          }
                        ]
                      }
                    ],
                  }
                ]
              }}></AppButton>
              <AppButton config={{
                id: "UserCancelBtn",
                title: "取消",
                visible: true,
                enabled: true,
                type: "primary",
                subscribes: [
                  {
                    event: "UserCancelBtn.click",
                    pubs: [
                      {
                        event: "@@navigator.push",
                        payload: {
                          url: "/user"
                        }
                      }
                    ]
                  }
                ]
              }}></AppButton>
            </Col>
          </Row>
        </Card>
        <Card style={{ width: "100%", backgroundColor: "#f9f9f9", marginTop: "15px" }} bodyStyle={{ padding: "15px" }}>
          <Row>
            <Col span={6}>
              <Field config={{
                form: "modify",
                enabled: true,
                id: "userCode",
                label: "用戶编码",  //标签名称
                labelSpan: 8,   //标签栅格比例（0-24）
                wrapperSpan: 16,  //输入框栅格比例（0-24）
                showRequiredStar: true,  //是否显示必填星号
                placeholder: "请输入编码"
              }} component={TextField} name="userCode" />
            </Col>
            <Col span={6}>
              <Field config={{
                enabled: true,
                form: "modify",
                id: "userName",
                label: "用戶名称",
                placeholder: "请输入名称",
                showRequiredStar: true,
                labelSpan: 8,   //标签栅格比例（0-24）
                wrapperSpan: 16,  //输入框栅格比例（0-24）
              }} component={TextField} name="userName" />
            </Col>
            <Col span={6}>
              <Field config={{
                  enabled: true,
                  form: "detail",
                  id: "personnel",
                  label: "关联人员",
                  labelSpan: 8,   //标签栅格比例（0-24）
                  wrapperSpan: 16,  //输入框栅格比例（0-24）
                  // formMode:'edit',

                  tableInfo: {
                      id: "tableIdPersonnel",
                      size: "small",
                      rowKey: "gid",
                      tableTitle: "参照",
                      width:"700",
                      columns: [
                          { title: '人员编号', width: 100, dataIndex: 'personnelCode', key: '2' },
                          { title: '人员名称', width: 100, dataIndex: 'personnelName', key: '3' },
                          { title: '人员工种', dataIndex: 'smPersonnelTypePostGidRef.personnelTypeName', key: '4', width: 100 },
                          { title: '业务单元', dataIndex: 'smBusiUnitGidRef.busiUnitName', key: '5', width: 100 },
                          { title: '部门', dataIndex: 'smDepartmentGidRef.name', key: '6', width: 100 }
                      ],
                      dataSource: {
                          type: 'api',
                          method: 'post',
                          url: '/sm/personnel/query.action'
                      }
                  },
                  pageId: 'findBack66ooo56565656',
                  displayField: "personnelName",
                  valueField: {
                      "from": "gid",
                      "to": "smPersonnelGid"
                  },
                  /* associatedFields: [
                       {
                           "from": "materialGidRef.name",
                           "to": "productGidRef.materialGidRef.name"
                       },
                       {
                           "from": "materialGidRef.measurementUnitGidRef.name",
                           "to": "productGidRef.materialGidRef.measurementUnitGidRef.name"
                       },
                       {
                           "from": "routePathRef.name",
                           "to": "productGidRef.routePathRef.name"
                       },
                   ],*/
                  /* subscribes: [
                       {
                           event: "gCode.onChange",
                           pubs: [
                               {
                                   event: "gCode.expression",//在某个组件上执行表达式
                                   meta: {
                                       expression: `
         let dataSource= {type: "api",method: "POST",url: "/ime/mdProductInfo/findById.action?id="+data.eventPayload.gid};
       resolveDataSource({dataSource:dataSource}).then(function(res){
         console.log(res);
         pubsub.publish("@@form.change", { id: "detail",name:"imePlanOrderDetailDTOs" ,value: fromJS(res.data.mdProductInfoDetailDTOs) })
       });
       `
                                   }
                               }
                           ]
                       }
                   ]*/
              }} name="smPersonnelGid" component={FindbackField} />
            </Col>
          </Row>
        </Card>

      </div>
    );
  }
}

Modify.propTypes = {
  dispatch: PropTypes.func.isRequired,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(props) {
    return {
        onSubmit: () => {
            debugger
        }
    };
}


let ModifyForm = reduxForm({
  form: "modify",
  validate,
  initialValues: Immutable.fromJS({ "orderType": "正常" })
})(Modify)

export default connect(mapStateToProps, mapDispatchToProps)(ModifyForm);
