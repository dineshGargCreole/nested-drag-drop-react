export const recoveryWorkflowSteps = [
    {
        id: '1',
        type: "vm_boot",
        abort: true,
        vms: [
            {
                vm_id: '346',
                script_path: "",
                script_parameters: "",
                abort: false,
                time_out: 15
            },
            {
                vm_id: '347',
                script_path: "",
                script_parameters: "",
                abort: false,
                time_out: 20
            }
        ]
    },
    {
        id: '3',
        type: "vm_boot",
        abort: true,
        vms: [
            {
                vm_id: '345',
                script_path: "s3 path1",
                script_parameters: "input_1",
                abort: true,
                time_out: 600000
            },
            {
                vm_id: '348',
                script_path: "s3 path1",
                script_parameters: "input_1",
                abort: true,
                time_out: 600000
            }
        ]
    },
    {
        id: '2',
        type: "manual_action",
        time_out: 10,
        abort: true,
        instruction:
            "1. Run Command prompt\n2. Run test setup\n3. Verify Replication"
    },
    {
        id: '4',
        type: "time_delay",
        time_delay: 30
    }
];
