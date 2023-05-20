import React from 'react'
import { useNavigate } from 'react-router'

function DoctorList({ doctor }) {

    const navigate = useNavigate()

  return (
    <>
      <div className="card m-2"
      style={{cursor:"pointer"}} 
      onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="card-header">
            Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
            <p>
                <b>Specialization: {doctor.specialization}</b>
            </p>
            <p>
                <b>Experience: {doctor.experience} years</b>
            </p>
            <p>
                <b>Fees per Consultation: {doctor.feesPerConsultation}</b>
            </p>
            <p>
                <b>Timings: {doctor.timing[0]} - {doctor.timing[1]}</b>
            </p>
        </div>
      </div>
    </>
  )
}

export default DoctorList
