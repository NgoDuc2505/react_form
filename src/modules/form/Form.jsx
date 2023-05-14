import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultVal } from '../../redux/initReducer';
class Form extends Component {
  state = {
    value: {
      id: '',
      name: '',
      email: '',
      phone: '',
    },
    error: {
      id: '',
      name: '',
      email: '',
      phone: '',
    },
  };
  userNameEle = React.createRef()
  static getDerivedStateFromProps = (newProps, currentState) => {
    // console.log(newProps);
    // console.log(currentState)
    let propsCre = (newProps.stateGet ? newProps.stateGet : defaultVal)
    // console.log(currentState.value.id !== propsCre.objUpdate.id && (propsCre.objUpdate.id !== ''))
    if (currentState.value.id !== propsCre.objUpdate.id && (propsCre.objUpdate.id !== '')) {
      console.log('--re-render')
      return {
        value: newProps.stateGet.objUpdate,
        error:{
          id:'',
        }
      };
    }
    return null;
  }
  render() {
    const disableAndClear = ()=>{
      //* handle when click on view detail: disabled input for user name and clear error of it
      if (this.props.stateGet?.objUpdate.id !== ''&& this.props.stateGet?.objUpdate.id !== undefined) {
        this.userNameEle.current ? this.userNameEle.current.disabled = true : console.log(this.userNameEle.current)
        
      } else {
        this.userNameEle.current ? this.userNameEle.current.disabled = false : console.log(this.userNameEle.current)
      }
    };
    disableAndClear();
    //* end of this logic
    const handleInput = (e) => {
      let { value, id } = e.target;
      this.setState({
        ...this.state,
        value: {
          ...this.state.value,
          [id]: value,
        }
      });
      handleValidateEmpty(value, id);
    }
    const handleValidateEmpty = (value, id) => {
      if (value) {
        this.setState({
          error: {
            ...this.state.error,
            [id]: '',
          }
        });
        handleValidRegix(value, id)
      } else {
        this.setState({
          error: {
            ...this.state.error,
            [id]: `Khong de trong ${id}`,
          }
        })
      }
    }
    const handleDuplicateUsername = (value, id) => {
      const propsFromState = (this.props.stateGet ? this.props.stateGet : defaultVal);
      let userArr = propsFromState.userArr;
      for (let i = 0; i < userArr.length; i++) {
        if (value === userArr[i].id) {
          this.setState({
            error: {
              ...this.state.error,
              [id]: `user name khong duoc trung!`
            }
          });
          break;
        }
      }
    }
    const handleValidRegix = (value, id) => {
      switch (id) {
        case 'id':
          const idPattern = /^[A-Za-z0-9]+(?:[A-Za-z0-9]+)*$/;
          handleDuplicateUsername(value, id);
          if (!value.match(idPattern)) {
            this.setState({
              error: {
                ...this.state.error,
                [id]: `vui long nhap ${id} phu hop!`
              }
            })
          }
          break;
        case 'name':
          const namePattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
          if (!value.match(namePattern)) {
            this.setState({
              error: {
                ...this.state.error,
                [id]: `vui long nhap ${id} phu hop!`
              }
            })
          }
          break;
        case 'phone':
          const phonePattern = /^[0-9]+$/;
          if (!value.match(phonePattern)) {
            this.setState({
              error: {
                ...this.state.error,
                [id]: `vui long nhap ${id} phu hop!`
              }
            })
          }
          break;
        case 'email':
          const emailPattern = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
          if (!value.match(emailPattern)) {
            this.setState({
              error: {
                ...this.state.error,
                [id]: `vui long nhap ${id} phu hop!`
              }
            })
          }
          break;
        default:
          break;
      }
    }
    const { error, value } = this.state;
    const handleSubmitBtn = () => {
      let isValid = true;
      let keyArray = Object.keys(error);
      let valueKeyArray = Object.keys(value);
      for (let i = 0; i < keyArray.length; i++) {
        if (value[valueKeyArray[i]]) {
          if (error[keyArray[i]]) {
            isValid = false;
            break;
          }
        } else {
          isValid = false;
          break;
        }
      }
      return isValid;
    }
    const handleAdd = () => {
      let isValid = handleSubmitBtn();
      if (isValid) {
        this.props.dispatch({
          type: 'add',
          payload: this.state.value,
        })
        alert('them thanh cong');
        this.setState({
          ...this.state,
          value: {
            id: '',
            name: '',
            email: '',
            phone: '',
          },
        });
      } else {
        alert('vui long kiem tra lai thong tin!')
      }
    }

    const { id, name, email, phone } = this.state.error;
    const handleUpdate = (id, value) => {
      let isValid = handleSubmitBtn();
      if (isValid) {
        this.props.dispatch({
          type: 'dataUpload',
          payload: {
            id,
            value,
          }
        });
        alert('cap nhat thanh cong');
        this.setState({
          ...this.state,
          value: {
            id: '',
            name: '',
            email: '',
            phone: '',
          },
        })
      } else {
        alert('Khong the cap nhat!')
      }
    }
    // console.log(this.props)
    return (
      <div className="card p-0 w-75 card-form">
        <h3 className='bg-dark text-white title-form'>Thông tin sinh viên</h3>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="id" className='text-left d-block'>Ma sinh vien</label>
                <input ref={this.userNameEle} onChange={handleInput} type="text" className='form-control' id='id' value={this.state.value.id} />
                <p className='text-danger'>{id}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="phone" className='text-left d-block'>So dien thoai</label>
                <input onChange={handleInput} type="text" className='form-control' id='phone' value={this.state.value.phone} />
                <p className='text-danger'>{phone}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="email" className='text-left d-block'>Email</label>
                <input onChange={handleInput} type="email" className='form-control' id='email' value={this.state.value.email} />
                <p className='text-danger'>{email}</p>
              </div>
            </div>
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="name" className='text-left d-block'>Ho ten</label>
                <input onChange={handleInput} type="text" className='form-control' id='name' value={this.state.value.name} />
                <p className='text-danger'>{name}</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              {/* <button className='btn btn-success' onClick={handleAdd}>Them sinh vien</button> */}
              {this.props.stateGet?.objUpdate.id ? (<button className='btn btn-warning mx-2' onClick={() => { handleUpdate(this.state.value.id, this.state.value) }}>cap nhat</button>) : (<button className='btn btn-success' onClick={handleAdd}>Them sinh vien</button>)}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (rootReducer) => {
  return {
    stateGet: rootReducer,
  }
}

export default connect(mapStateToProps)(Form)