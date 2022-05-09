
import * as React from 'react';
import { message, Spin } from 'antd';
import { Input, Button } from '../common/components/form';
import axios from 'axios';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './qq.css'
interface State {
  qqNumber: string,
  loading: boolean,
  name: string,
  qlogo: string,
  qq: string,
}

interface Props {
}

export class MemberPageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      qqNumber: '',
      loading: false,
      name: '',
      qlogo: '',
      qq: ""
    }
  }

  // input onchage事件
  private onChange = (name,value) => {
   this.setState({
    qqNumber:value
   })
  }

  // 搜索提交事件
  private onSubmite = () => {
    let preg = "[1-9][0-9]{4,14}";
    if (this.state.qqNumber.match(preg)){
      this.setState({
        loading:true
      })
      axios({
        method: 'get',
        url: 'https://api.uomg.com/api/qq.info',
        params: {
          qq: this.state.qqNumber
        },
      }).then(response => {
        console.log(response)
        this.setState({
          loading:false,
          name: response.data.name,
          qlogo: response.data.qlogo,
          qq: response.data.qq
        })
      });
    } else {
      message.info('请输入正确的qq号查询！');
    }
  }

  render() {
    return (
        <div className='qq-content'>
          <div className='qq-content-search'>
            <form>
              <div className='qq-content-search-input'>
                <Input
                  name={this.state.qqNumber}
                  label="qq号："
                  value={this.state.qqNumber}
                  onChange={this.onChange}
                />
              </div>
              <div className='qq-content-search-btn'>
                <Button
                  label="查找"
                  className="btn-search"
                  onClick={this.onSubmite}
                />
              </div>
            </form>
          </div>
          <div className='qq-content-result'>
            {
              this.state.loading ?
              <Spin className='spin'></Spin>:
                this.state.qq ?
                <div className='qq-content-result-user'>
                  <div className='qq-content-result-user-head'>
                    <img src={this.state.qlogo} alt="" />
                  </div>
                  <div className='qq-content-result-user-info'>
                    <div>{this.state.name}({this.state.qq})</div>
                  </div>
                </div>:
                null
            }
          </div>
        </div>
    );
  }
}