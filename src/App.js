import React, { Component } from "react";
import ReactDOM from "react-dom";
import { recoveryWorkflowSteps } from "./data";
import RecoveryWorkflowStep from "./recoverWorkflowStep";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const vmIdNameMap = {
    '345': "Test_VM_1",
    '346': "Test_VM_2",
    '347': "Test_VM_3",
    '348': "Test VM 4"
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const getContainerStyle = isDraggingOver => ({
    height: `500`
});

class App extends Component {
    state = {
        recoveryWorkflowSteps: recoveryWorkflowSteps
    };
    handleDragEnd = result => {
        console.info(result);
        const { source, destination } = result;
        // dropped outside the list
        if (!destination) {
            return;
        }

        const sourceIndex = source.index;
        const destIndex = destination.index;
        if (result.type === "droppableStep") {
            const recoveryWorkflowSteps = reorder(
                this.state.recoveryWorkflowSteps,
                sourceIndex,
                destIndex
            );

            this.setState({
                recoveryWorkflowSteps
            });
        } else if (result.type === "droppableVM") {
            const stepIdVMMap = this.state.recoveryWorkflowSteps.reduce(
                (acc, step) => {
                    if (step.type === "vm_boot") {
                        acc[step.id] = step.vms;
                    }
                    return acc;
                },
                {}
            );

            const sourceStepId = parseInt(source.droppableId.split("-")[1]);
            const destStepId = parseInt(destination.droppableId.split("-")[1]);

            const sourceStepVMs = stepIdVMMap[sourceStepId];
            const destStepVMs = stepIdVMMap[destStepId];

            let newSteps = [...this.state.recoveryWorkflowSteps];

            /** In this case subItems are reOrdered inside same Parent */
            if (sourceStepId === destStepId) {
                const reorderedVMs = reorder(
                    sourceStepVMs,
                    sourceIndex,
                    destIndex
                );
                newSteps = newSteps.map(step => {
                    if (step.id === sourceStepId) {
                        step.vms = reorderedVMs;
                    }
                    return step;
                });
                this.setState({
                    recoveryWorkflowSteps: newSteps
                });
            } else {
                let newSourceStepVMs = [...sourceStepVMs];
                const [draggedVM] = newSourceStepVMs.splice(sourceIndex, 1);

                let newDestStepVMs = [...destStepVMs];
                newDestStepVMs.splice(destIndex, 0, draggedVM);

                newSteps = newSteps.map(step => {
                    if (step.id === sourceStepId) {
                        step.vms = newSourceStepVMs;
                    } else if (step.id === destStepId) {
                        step.vms = newDestStepVMs;
                    }
                    return step;
                });
                this.setState({
                    recoveryWorkflowSteps: newSteps
                });
            }
        }
    };

    render() {
        const { recoveryWorkflowSteps } = this.state;
        return (
            <div className="container">
                <DragDropContext onDragEnd={this.handleDragEnd}>
                    <Droppable
                        droppableId={`droppableStepMain`}
                        type="droppableStep"
                    >
                        {(provided, snapshot) => (
                            <div>
                                <div
                                    className="steps-wrapper h-100"
                                    ref={provided.innerRef}
                                    style={getContainerStyle(
                                        snapshot.isDraggingOver
                                    )}
                                >
                                    {recoveryWorkflowSteps.map(
                                        (step, index) => {
                                          console.log('step', step)
                                          console.log('index', index)
                                            return <RecoveryWorkflowStep
                                                key={index}
                                                index={index}
                                                stepData={step}
                                                vmIdNameMap={vmIdNameMap}
                                            />
                                        }
                                    )}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

export default App;
