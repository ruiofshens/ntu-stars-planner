import React from 'react';

function CourseInputGroup() {
    return (
        <div className="w-75">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" type="button">+</button>
                </div>
                <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-secondary" type="button">+</button>
                </div>
                <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
            </div>

        </div>
    );
  }
  
  export default CourseInputGroup;