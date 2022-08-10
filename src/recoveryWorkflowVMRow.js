import React, { Component } from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class RecoveryWorkflowVMRow extends Component {
    render() {
        const { vmObj, vmIdNameMap, index } = this.props;
        return (
            <Draggable
                key={vmObj["vm_id"]}
                draggableId={vmObj["vm_id"]}
                index={index}
            >
                {provided => (
                    <div>
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            key={vmObj["vm_id"]}
                            className="step-item px-3"
                        >
                            <div>
                                <span
                                    className="phxIcon phxIcon-drag-row mx-2"
                                    {...provided.dragHandleProps}
                                >
                                    D
                                </span>
                                <span className="">
                                    {vmIdNameMap[vmObj["vm_id"]]}
                                </span>
                            </div>
                            {vmObj["script_path"] && (
                                <span className="phxIcon phxIcon-vm" />
                            )}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        );
    }
}

RecoveryWorkflowVMRow.propTypes = {
    vmObj: PropTypes.object.isRequired,
    vmIdNameMap: PropTypes.object.isRequired
};

export default RecoveryWorkflowVMRow;
