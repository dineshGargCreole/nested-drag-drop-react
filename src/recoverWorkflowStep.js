import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RecoveryWorkflowVMRow from "./recoveryWorkflowVMRow";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DR_RECOVERY_STEP_TYPE_VM_BOOT = "vm_boot";
const DR_RECOVERY_STEP_TYPE_TIME_DELAY = "time_delay";

const recoveryStepTypeNameMap = {
    vm_boot: "VM Boot",
    manual_action: "Manual Action",
    time_delay: "Time Delay"
};

const getStepStyle = (isDragging, draggableStyles) => ({
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "",

    // styles we need to apply on draggables
    ...draggableStyles
});

export default class RecoveryWorkflowStep extends Component {
    handleVMDragEnd = result => {
        console.info(result);
    };

    render() {
        const { stepData, index, vmIdNameMap } = this.props;

        return (
            <Draggable
                key={stepData.id}
                draggableId={stepData.id}
                index={index}
            >
                {(provided, snapshot) => (
                    <div>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            key={index}
                            className="step-container mb-3"
                            style={getStepStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                            )}
                        >
                            <div className="step-header px-2">
                                <div>
                                    <span
                                        className="phxIcon phxIcon-drag-row mx-2"
                                        {...provided.dragHandleProps}
                                    >
                                        D
                                    </span>
                                    <span className="header-text">
                                        Step {index + 1}:{" "}
                                        {
                                            recoveryStepTypeNameMap[
                                                stepData["type"]
                                            ]
                                        }
                                    </span>
                                </div>
                                {stepData.type ===
                                    DR_RECOVERY_STEP_TYPE_TIME_DELAY &&
                                    stepData.time_delay && (
                                        <span className="header-text">
                                            {stepData.time_delay}
                                        </span>
                                    )}
                            </div>
                            {stepData.type === DR_RECOVERY_STEP_TYPE_VM_BOOT &&
                                stepData.vms.length > 0 && (
                                    <Droppable
                                        droppableId={`droppableVM-${
                                            stepData.id
                                        }`}
                                        type="droppableVM"
                                    >
                                        {provided => (
                                            <div>
                                                <div ref={provided.innerRef}>
                                                    {stepData.vms.map(
                                                        (vm, vmIndex) => (
                                                            <RecoveryWorkflowVMRow
                                                                vmObj={vm}
                                                                vmIdNameMap={
                                                                    vmIdNameMap
                                                                }
                                                                key={vmIndex}
                                                                index={vmIndex}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                )}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        );
    }
}

RecoveryWorkflowStep.propTypes = {
    index: PropTypes.number.isRequired,
    stepData: PropTypes.object.isRequired
};
