using Snowflake

qubit_count_circuit=3

circuit = QuantumCircuit(qubit_count = qubit_count_circuit)

# push!(circuit, [control_x(1, 3),rotation(2,π,-π/4),control_z(2,1)])
push!(circuit, [sigma_x(2),control_z(2,1)])
# push!(circuit, [sigma_x(1)])

user="user_test"

host        =ENV["ANYON_QUANTUM_HOST"]
access_token=ENV["ANYON_QUANTUM_TOKEN"]

test_client=Client(host,user,access_token)

qubit_count_qpu=3
connectivity=Matrix([1 1 0; 1 1 1 ; 0 1 1])

native_gates=["x" , "y" , "z" , "i", "cz"]

num_repetitions=100

verbose=false

qpu=QPU(
    "Anyon Systems Inc.",   # manufacturer
    "Yukon",                # generation
    "0000-0000-0001",       # serial_number
    host,                   # host
    qubit_count_qpu,        # qubit_count
    connectivity,           # connectivity
    native_gates            # native_gates
)

qpu_service=QPUService(test_client,qpu)

println("run with qpu_service: $qpu_service \n\n using circuit: $circuit")

histogram=run(qpu_service, circuit ,num_repetitions,verbose=verbose)

if haskey(histogram,"error_msg")
    println("Job failed: \n\t$(histogram["error_msg"]) \n")
else
    println("Result of circuit computation:")
    println("State\t|\tPopulation")
    for (key,val) in histogram
        println("$key \t|\t$val")
    end
end
