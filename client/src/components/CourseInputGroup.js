import React from 'react';

function CourseInputGroup() {
    return (
        <div className="w-75">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" type="button">+</button>
                </div>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" type="button">+</button>
                </div>
                <input type="text" className="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
            </div>

        </div>
    );
  }
  
  export default CourseInputGroup;