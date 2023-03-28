using Snowflake
using Test

@testset "push_pop_gate" begin
    c = QuantumCircuit(qubit_count = 2)
    print(c)
    push_gate!(c, [hadamard(1)])
    @test length(c.pipeline) == 1


    push_gate!(c, [control_x(1, 2)])
    @test length(c.pipeline) == 2
    pop_gate!(c)
    @test length(c.pipeline) == 1

    push_gate!(c, control_x(1, 2))
    @test length(c.pipeline) == 2

    plot_histogram(c,100)
    plot_bloch_sphere(c)

    print(c)
end

@testset "print_circuit" begin
    c = QuantumCircuit(qubit_count = 2)
    for i = 1:50
        push_gate!(c, [control_x(1, 2)])
    end
    print(c)

    c = QuantumCircuit(qubit_count = 10)
    push_gate!(c, [control_x(9, 10)])
    print(c)

    c = QuantumCircuit(qubit_count = 3)
    push_gate!(c, [control_x(1, 3),rotation(2,π,-π/4),control_z(2,1)])
    print(c)
end


@testset "bellstate" begin

    Ψ_up = spin_up()
    Ψ_down = spin_down()

    Ψ_p = (1.0 / sqrt(2.0)) * (Ψ_up + Ψ_down)
    Ψ_m = (1.0 / sqrt(2.0)) * (Ψ_up - Ψ_down)
    c = QuantumCircuit(qubit_count = 2)
    push_gate!(c, [hadamard(1)])
    push_gate!(c, [control_x(1, 2)])
    ψ = simulate(c)
    @test ψ ≈ 1 / sqrt(2.0) * (kron(Ψ_up, Ψ_up) + kron(Ψ_down, Ψ_down))

    readings = simulate_shots(c, 101)
    @test ("00" in readings)
    @test ("11" in readings)
    @test ~("10" in readings)
    @test ~("01" in readings)
end


@testset "phase_kickback" begin

    Ψ_up = spin_up()
    Ψ_down = spin_down()

    Ψ_p = (1.0 / sqrt(2.0)) * (Ψ_up + Ψ_down)
    Ψ_m = (1.0 / sqrt(2.0)) * (Ψ_up - Ψ_down)


    c = QuantumCircuit(qubit_count = 2)

    push_gate!(c, [hadamard(1), sigma_x(2)])
    push_gate!(c, [hadamard(2)])
    push_gate!(c, [control_x(1, 2)])
    ψ = simulate(c)

    @test ψ ≈ kron(Ψ_m, Ψ_m)
end

@testset "throw_if_gate_outside_circuit" begin
    c = QuantumCircuit(qubit_count = 2)
    @test_throws DomainError push_gate!(c, control_x(1, 3))
end

@testset "get_inverse" begin
    c = QuantumCircuit(qubit_count=2)
    push_gate!(c, rotation_x(1, pi/2))
    push_gate!(c, control_x(1, 2))
    inverse_c = get_inverse(c)

    @test get_instruction_symbol(inverse_c.pipeline[1]) == "cx"
    @test inverse_c.pipeline[1].target == [1, 2]
    @test get_instruction_symbol(inverse_c.pipeline[2]) == "rx"
    @test inverse_c.pipeline[2].target == 1
    @test inverse_c.pipeline[2].parameter ≈ -pi/2
end

@testset "get_gate_counts" begin
    c = QuantumCircuit(qubit_count = 2)
    push_gate!(c, [sigma_x(1), sigma_x(2)])
    push_gate!(c, control_x(1, 2))
    push_gate!(c, sigma_x(2))
    gate_counts = get_gate_counts(c)
    @test gate_counts == Dict("cx"=>1, "x"=>3)
end

@testset "get_num_gates" begin
    c = QuantumCircuit(qubit_count = 2)
    push_gate!(c, [sigma_x(1), sigma_x(2)])
    push_gate!(c, control_x(1, 2))
    push_gate!(c, sigma_x(2))
    num_gates = get_num_gates(c)
    @test num_gates == 4
end

@testset "get_measurement_probabilities" begin
    circuit = QuantumCircuit(qubit_count=2)
    push_gate!(circuit, [hadamard(1), sigma_x(2)])
    probabilities = get_measurement_probabilities(circuit)
    @test probabilities ≈ [0, 0.5, 0, 0.5]

    target_qubit = [1]
    probabilities = get_measurement_probabilities(circuit, target_qubit)
    @test probabilities ≈ [0.5, 0.5]

    target_qubit = [2]
    probabilities = get_measurement_probabilities(circuit, target_qubit)
    @test probabilities ≈ [0, 1]
end
