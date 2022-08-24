import { BiEdit } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './company_activity.css'

function CompanyActivity() {
    const [deleteStatus, setDeleteStatus] = useState(false)
    const navigate = useNavigate()
    const [data, setData] = useState([
        {
            card_img: '',
            card_area: '',
            card_info: '',
            created_at: '',
            sid: '',
            company_id: '',
        },
    ])
    const loginUser = JSON.parse(localStorage.getItem('comAuth'))
    const goToadd = () => {
        navigate(`/company/activity/add`)
    }
    const goToedit = (sid) => {
        sessionStorage.setItem('activitysid', sid)
        navigate(`/company/activity/edit`)
    }
    const getdata = async () => {
        const response = await axios.get('http://localhost:3600/activity', {
            headers: { company_id: loginUser.company_id },
        })
        const newArrayToShow = response.data.map((v) => {
            return { ...v, card_img: JSON.parse(v.card_img) }
        })

        // console.log(response.data)
        // console.log(JSON.parse(response.data[0].card_img))
        setData(newArrayToShow)
    }
    useEffect(() => {
        getdata()
    }, [deleteStatus])

    const deleteActivity = async (sid) => {
        setDeleteStatus(false)
        const r = await fetch('http://localhost:3600/activity/deleteactivity', {
            method: 'DELETE',
            body: JSON.stringify({
                sid: sid,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const obj = await r.json()
        console.log(obj)
        setDeleteStatus(true)
    }

    return (
        <div className="activityT">
            <div className="container ">
                <div className="row justify-content-between align-items-baseline mb-4">
                    <div className="activityT_name">活動管理</div>
                    <div className="addactivity" onClick={() => goToadd()}>
                        新增活動
                    </div>
                </div>
                {data
                    ? data.map((row) => (
                          <div
                              className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250  position-relative"
                              key={'mm' + row.sid}
                          >
                              <div className="col-auto d-none d-lg-block">
                                  <img
                                      src={`/images/activity/${row.card_img[0]}`}
                                      width="300"
                                      height="213"
                                      alt=""
                                  />
                              </div>
                              <div className="col p-2 d-flex flex-column position-static ">
                                  <div className="align-self-end">
                                      <BiEdit
                                          onClick={() => goToedit(row.sid)}
                                          size={18}
                                          style={{
                                              margin: '0 3px',
                                              cursor: 'pointer',
                                          }}
                                      />

                                      <RiDeleteBin6Line
                                          onClick={() => {
                                              deleteActivity(row.sid)
                                          }}
                                          size={18}
                                          style={{
                                              margin: '0 3px',
                                              cursor: 'pointer',
                                          }}
                                      />
                                  </div>
                                  <h3 className="mb-0">{`${row.card_area}`}</h3>
                                  <hr />
                                  <p className="mb-auto">
                                      {`${row.card_info}`}
                                  </p>
                                  <strong className="d-inline-block  text-success col align-self-end">
                                      建立時間：
                                      {`${row.created_at}`}
                                  </strong>
                              </div>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    )
}
export default CompanyActivity
