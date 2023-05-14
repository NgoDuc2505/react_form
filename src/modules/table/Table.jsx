import React, { Component } from 'react';
import { connect } from 'react-redux';
import { defaultVal } from '../../redux/initReducer';
class Table extends Component {
  render() {
    // console.log(this.props.stateGet ?? defaultVal)
    const stateGet = (this.props.stateGet ? this.props.stateGet : defaultVal);
    const { userArr } = stateGet;
    const handleViewDetail =(object)=>{
      this.props.dispatch({
        type:'update',
        payload:object,
      })
    };
    const handleDeleteDispatch=(object)=>{
      if(confirm('ban muon xoa?')){
        this.props.dispatch({
          type:'delete',
          payload:object,
        })
      }
    };
    return (
        <div className="card p-0 w-75 card-form my-5">
        <table>
          <thead className='bg-dark text-white text-center'>
            <tr>
              <th>MaSV</th>
              <th>Ho va Ten</th>
              <th>Email</th>
              <th>So dien thoai</th>
              <th>Thao tac</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {userArr.map((student)=>{
                return(
                    <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>
                      <button className='btn btn-info mx-2' onClick={()=>{handleViewDetail(student)}}>Xem</button>
                      <button className='btn btn-danger' onClick={()=>{handleDeleteDispatch(student)}}>Xoa</button>
                    </td>
                  </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps=(rootState)=>{
    return{
        stateGet: rootState,
    }
}

export default connect(mapStateToProps)(Table)