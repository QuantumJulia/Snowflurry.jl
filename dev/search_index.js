var documenterSearchIndex = {"docs":
[{"location":"library.html#Library","page":"Library","title":"Library","text":"","category":"section"},{"location":"library.html","page":"Library","title":"Library","text":"DocTestSetup = :(using Snowflake)","category":"page"},{"location":"library.html#Quantum-Circuit","page":"Library","title":"Quantum Circuit","text":"","category":"section"},{"location":"library.html","page":"Library","title":"Library","text":"QuantumCircuit\npush_gate!\npop_gate!\nsimulate\nsimulate_shots","category":"page"},{"location":"library.html#Snowflake.QuantumCircuit","page":"Library","title":"Snowflake.QuantumCircuit","text":"    QuantumCircuit(qubit_count = .., bit_count = ...)\n\nA data structure to represnts a quantum circuit.   Fields\n\nqubit_count::Int – number of qubits (i.e. quantum register size).\nbit_count::Int – number of classical bits (i.e. classical register size).\nid::UUID – a universally unique identifier for the circuit. This id is automatically generated one an instance is created. \npipeline::Array{Array{Gate}} – the pipeline of gates to operate on qubits.\n\nExamples\n\njulia> c = Snowflake.QuantumCircuit(qubit_count = 2, bit_count = 0)\nQuantum Circuit Object:\n   id: b2d2be56-7af2-11ec-31a6-ed9e71cb3360 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:\n     \nq[2]:\n\n\n\n\n\n","category":"type"},{"location":"library.html#Snowflake.push_gate!","page":"Library","title":"Snowflake.push_gate!","text":"    push_gate!(circuit::QuantumCircuit, gate::Gate)\n    push_gate!(circuit::QuantumCircuit, gates::Array{Gate})\n\nPushes a single gate or an array of gates to the circuit pipeline. This function is mutable. \n\nExamples\n\njulia> c = Snowflake.QuantumCircuit(qubit_count = 2, bit_count = 0);\n\njulia> push_gate!(c, [hadamard(1),sigma_x(2)])\nQuantum Circuit Object:\n   id: 57cf5de2-7ba7-11ec-0e10-05c6faaf91e9 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H--\n          \nq[2]:--X--\n          \n\n\njulia> push_gate!(c, control_x(1,2))\nQuantum Circuit Object:\n   id: 57cf5de2-7ba7-11ec-0e10-05c6faaf91e9 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H----*--\n            |  \nq[2]:--X----X--\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.pop_gate!","page":"Library","title":"Snowflake.pop_gate!","text":"    pop_gate!(circuit::QuantumCircuit)\n\nRemoves the last gate from circuit.pipeline. \n\nExamples\n\njulia> c = Snowflake.QuantumCircuit(qubit_count = 2, bit_count = 0);\n\njulia> push_gate!(c, [hadamard(1),sigma_x(2)])\nQuantum Circuit Object:\n   id: 57cf5de2-7ba7-11ec-0e10-05c6faaf91e9 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H--\n          \nq[2]:--X--\n          \n\n\njulia> push_gate!(c, control_x(1,2))\nQuantum Circuit Object:\n   id: 57cf5de2-7ba7-11ec-0e10-05c6faaf91e9 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H----*--\n            |  \nq[2]:--X----X--\n\njulia> pop_gate!(c)\nQuantum Circuit Object:\n   id: 57cf5de2-7ba7-11ec-0e10-05c6faaf91e9 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H--\n          \nq[2]:--X--\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.simulate","page":"Library","title":"Snowflake.simulate","text":"    simulate(circuit::QuantumCircuit)\n\nSimulates and returns the wavefunction of the quantum device after running circuit. \n\nExamples\n\njulia> c = Snowflake.QuantumCircuit(qubit_count = 2, bit_count = 0);\n\njulia> push_gate!(c, hadamard(1))\nQuantum Circuit Object:\n   id: 57cf5de2-7ba7-11ec-0e10-05c6faaf91e9 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H--\n          \nq[2]:-----\n          \n\n\njulia> push_gate!(c, control_x(1,2))\nQuantum Circuit Object:\n   id: 57cf5de2-7ba7-11ec-0e10-05c6faaf91e9 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H----*--\n            |  \nq[2]:-------X--\n               \n\n\njulia> ket = simulate(c);\n\njulia> print(ket)\n4-element Ket:\n0.7071067811865475 + 0.0im\n0.0 + 0.0im\n0.0 + 0.0im\n0.7071067811865475 + 0.0im\n\n\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.simulate_shots","page":"Library","title":"Snowflake.simulate_shots","text":"    simulate_shots(c::QuantumCircuit, shots_count::Int = 100)\n\nEmulates the function of a quantum computer by running a circuit for given number of shots and return measurement results.\n\nExamples\n\njulia> c = Snowflake.QuantumCircuit(qubit_count = 2, bit_count = 0);\n\njulia> push_gate!(c, hadamard(1))\nQuantum Circuit Object:\n   id: 57cf5de2-7ba7-11ec-0e10-05c6faaf91e9 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H--\n          \nq[2]:-----\n          \n\n\njulia> push_gate!(c, control_x(1,2))\nQuantum Circuit Object:\n   id: 57cf5de2-7ba7-11ec-0e10-05c6faaf91e9 \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H----*--\n            |  \nq[2]:-------X--\n               \n\n\njulia> simulate_shots(c, 99)\n99-element Vector{String}:\n \"11\"\n \"00\"\n \"11\"\n \"11\"\n \"11\"\n \"11\"\n \"11\"\n \"00\"\n \"00\"\n \"11\"\n ⋮\n \"00\"\n \"00\"\n \"11\"\n \"00\"\n \"00\"\n \"00\"\n \"00\"\n \"00\"\n \"00\"\n\n\n\n\n\n","category":"function"},{"location":"library.html#Quantum-Processing-Unit","page":"Library","title":"Quantum Processing Unit","text":"","category":"section"},{"location":"library.html","page":"Library","title":"Library","text":"QPU\ncreate_virtual_qpu","category":"page"},{"location":"library.html#Snowflake.QPU","page":"Library","title":"Snowflake.QPU","text":"Represnts a Quantum Processing Unit (QPU). Fields\n\nmanufacturer:: String – qpu manufacturer (e.g. \"anyon\")\ngeneration:: String – qpu generation (e.g. \"yukon\")\nserial_number:: String – qpu serial_number (e.g. \"ANYK202201\")\nhost:: String – the remote host url address to send the jobs to\nqubit_count:: Int – number of physical qubits on the machine\nconnectivity::SparseArrays.SparseMatrixCSC{Int} – a matrix describing the connectivity between qubits\nnative_gates:: Vector{String} – the vector of native gates symbols supported by the qpu architecture\n\n```\n\n\n\n\n\n","category":"type"},{"location":"library.html#Snowflake.create_virtual_qpu","page":"Library","title":"Snowflake.create_virtual_qpu","text":"create_virtual_qpu(qubit_count::Int, connectivity::Matrix{Int},\n    native_gates::Vector{String}, host = \"localhost:5600\")\n\nCreates a virtual quantum processor with qubit_count number of qubits, a connectivity matrix, and a vector of native_gates.  The return value is a QPU stucture (see  QPU).\n\nExamples\n\nTo generate a QPU structure, the connectivity must be specified. Let's assume that we have a 3-qubit device where there is connectivity between qubits 2 and 1 as well as between qubits 2 and 3. If qubit 2 can only be a control qubit, the connectivity matrix corresponds to:\n\njulia> connectivity = [1 0 0\n                       1 1 1\n                       0 0 1]\n3×3 Matrix{Int64}:\n 1  0  0\n 1  1  1\n 0  0  1\n\nHere, the ones in the diagonal indicate that all qubits can perform single-qubit gates. If there is a one in an off-diagonal entry with row i and column j, it indicates that a two-qubit gate with control qubit i and target qubit j can be applied.\n\nIf the native gates are the Pauli-X gate, the Hadamard gate, and the control-X gate, the QPU can be created as follows: \n\njulia> qpu = create_virtual_qpu(3, connectivity, [\"x\", \"h\", \"cx\"])\nQuantum Processing Unit:\n   manufacturer: none\n   generation: none \n   serial_number: 00 \n   host: localhost:5600 \n   qubit_count: 3 \n   native_gates: [\"x\", \"h\", \"cx\"] \n   connectivity = sparse([1, 2, 2, 2, 3], [1, 1, 2, 3, 3], [1, 1, 1, 1, 1], 3, 3)\n\n\n\n\n\n","category":"function"},{"location":"library.html#Quantum-Toolkit","page":"Library","title":"Quantum Toolkit","text":"","category":"section"},{"location":"library.html#Basic-Quantum-Objects","page":"Library","title":"Basic Quantum Objects","text":"","category":"section"},{"location":"library.html","page":"Library","title":"Library","text":"There are three basic quantum objects defined in Snowflake to simulate a Quantum system. These objects are Ket, Bra, and Operator.","category":"page"},{"location":"library.html","page":"Library","title":"Library","text":"Ket\nBra\nOperator\nMultiBodySystem\ncommute\nanticommute\nnormalize!\nket2dm\nfock_dm\nSnowflake.moyal\nSnowflake.genlaguerre\nget_embed_operator\nfock\ncreate\ndestroy\nnumber_op\ncoherent\nsesolve\nmesolve","category":"page"},{"location":"library.html#Snowflake.Ket","page":"Library","title":"Snowflake.Ket","text":"A Ket represnts a quantum wavefunction and is mathematically equivalent to a column vector of complex values. The norm of a Ket should always be unity.   Fields\n\ndata – the stored values.\n\nExamples\n\nAlthough NOT the preferred way, one can directly build a Ket object by passing a column vector as the initializer. \n\njulia> using Snowflake\n\njulia> ψ = Snowflake.Ket([1.0; 0.0; 0.0]);\n\njulia> print(ψ)\n3-element Ket:\n1.0 + 0.0im\n0.0 + 0.0im\n0.0 + 0.0im\n\nA better way to initialize a Ket is to use a pre-built basis such as fock basis. See fock for further information on this function. \n\njulia> ψ = Snowflake.fock(2, 3);\n\njulia> print(ψ)\n3-element Ket:\n0.0 + 0.0im\n0.0 + 0.0im\n1.0 + 0.0im\n\n\n\n\n\n","category":"type"},{"location":"library.html#Snowflake.Bra","page":"Library","title":"Snowflake.Bra","text":"A structure representing a Bra (i.e. a row vector of complex values). A Bra is created as the complex conjugate of a Ket. Fields\n\ndata – the stored values.\n\nExamples\n\njulia> ψ = Snowflake.fock(1, 3);\n\njulia> print(ψ)\n3-element Ket:\n0.0 + 0.0im\n1.0 + 0.0im\n0.0 + 0.0im\n\njulia> _ψ = Snowflake.Bra(ψ);\n\njulia> print(_ψ)\nBra(Any[0.0 - 0.0im 1.0 - 0.0im 0.0 - 0.0im])\n\n\njulia> _ψ * ψ    # A Bra times a Ket is a scalar\n1.0 + 0.0im\n\njulia> ψ*_ψ     # A Ket times a Bra is an operator\n(3, 3)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    1.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im\n\n\n\n\n\n","category":"type"},{"location":"library.html#Snowflake.Operator","page":"Library","title":"Snowflake.Operator","text":"A structure representing a quantum operator (i.e. a complex matrix). Fields\n\ndata – the complex matrix.\n\nExamples\n\njulia> z = Snowflake.Operator([1.0 0.0;0.0 -1.0])\n(2, 2)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n1.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    -1.0 + 0.0im\n\n\nAlternatively:\n\njulia> z = Snowflake.sigma_z()  #sigma_z is a defined function in Snowflake\n(2, 2)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n1.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    -1.0 + 0.0im\n\n\n\n\n\n","category":"type"},{"location":"library.html#Snowflake.MultiBodySystem","page":"Library","title":"Snowflake.MultiBodySystem","text":"A structure representing a quantum multi-body system. Fields\n\nhilbert_space_structure – a vector of integers specifying the local hilbert space size for each \"body\" within the multi-body system. \n\n\n\n\n\n","category":"type"},{"location":"library.html#Snowflake.commute","page":"Library","title":"Snowflake.commute","text":"Snowflake.commute(A::Operator, B::Operator)\n\nReturns the commutation of A and B.\n\njulia> σ_x = sigma_x()\n(2, 2)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n0.0 + 0.0im    1.0 + 0.0im\n1.0 + 0.0im    0.0 + 0.0im\n\n\njulia> σ_y = sigma_y()\n(2, 2)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n0.0 + 0.0im    0.0 - 1.0im\n0.0 + 1.0im    0.0 + 0.0im\n\n\njulia> Snowflake.commute(σ_x,σ_y)\n(2, 2)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n0.0 + 2.0im    0.0 + 0.0im\n0.0 + 0.0im    0.0 - 2.0im\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.anticommute","page":"Library","title":"Snowflake.anticommute","text":"Snowflake.anticommute(A::Operator, B::Operator)\n\nReturns the anticommutation of A and B.\n\njulia> σ_x = Snowflake.sigma_x()\n(2, 2)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n0.0 + 0.0im    1.0 + 0.0im\n1.0 + 0.0im    0.0 + 0.0im\n\n\njulia> Snowflake.anticommute(σ_x,σ_x)\n(2, 2)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n2.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    2.0 + 0.0im\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.normalize!","page":"Library","title":"Snowflake.normalize!","text":"Snowflake.normalize!(x::Ket)\n\nNormalizes Ket x such that its magnitude becomes unity.\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.ket2dm","page":"Library","title":"Snowflake.ket2dm","text":"Snowflake.ket2dm(ψ)\n\nReturns the density matrix corresponding to the pure state ψ \n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.fock_dm","page":"Library","title":"Snowflake.fock_dm","text":"Snowflake.fock_dm(i, hspace_size)\n\nReturns the density matrix corresponding to fock base i defined in a hilbert space size of hspace_size.\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.moyal","page":"Library","title":"Snowflake.moyal","text":"Snowflake.moyal(m, n)\n\nReturns the Moyal function w_mn(eta) for fock states m and n.\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.genlaguerre","page":"Library","title":"Snowflake.genlaguerre","text":"Snowflake.genlaguerre(x, alpha, n)\n\nReturns the generalized Laguerre polynomial of degree n for x using a recursive method. See https://en.wikipedia.org/wiki/Laguerre_polynomials.\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.get_embed_operator","page":"Library","title":"Snowflake.get_embed_operator","text":"get_embed_operator(op::Operator, target_body_index::Int, system::MultiBodySystem)\n\nUses a local operator (op) which is defined for a particular body (e.g. qubit) with index target_body_index to build the corresponding operator for the hilbert soace of the  multi-body system given by system. \n\nExamples\n\njulia> system = Snowflake.MultiBodySystem(3,2)\nSnowflake.Multibody system with 3 bodies\n   Hilbert space structure:\n   [2, 2, 2]\n\njulia> x = Snowflake.sigma_x()\n(2, 2)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n0.0 + 0.0im    1.0 + 0.0im\n1.0 + 0.0im    0.0 + 0.0im\n\njulia> X_1=Snowflake.get_embed_operator(x,1,system)\n(8, 8)-element Snowflake.Operator:\nUnderlying data Matrix{Complex}: \n0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    1.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    1.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    1.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    1.0 + 0.0im\n1.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    1.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    0.0 + 0.0im    1.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im\n0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    1.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im    0.0 + 0.0im\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.fock","page":"Library","title":"Snowflake.fock","text":"Snowflake.fock(i, hspace_size)\n\nReturns the ith fock basis of a Hilbert space with size hspace_size as Snowflake.Ket\n\nExamples\n\njulia> ψ = Snowflake.fock(0, 3);\n\njulia> print(ψ)\n3-element Ket:\n1.0 + 0.0im\n0.0 + 0.0im\n0.0 + 0.0im\n\n\njulia> ψ = Snowflake.fock(1, 3);\n\njulia> print(ψ)\n3-element Ket:\n0.0 + 0.0im\n1.0 + 0.0im\n0.0 + 0.0im\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.create","page":"Library","title":"Snowflake.create","text":"Snowflake.create(hspace_size)\n\nReturns the bosonic creation operator for a fock space of size hspace_size.\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.destroy","page":"Library","title":"Snowflake.destroy","text":"Snowflake.destroy(hspace_size)\n\nReturns the bosonic annhilation operator for a fock space of size hspace_size.\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.number_op","page":"Library","title":"Snowflake.number_op","text":"Snowflake.number_op(hspace_size)\n\nReturns the number operator for a fock space of size hspace_size.\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.coherent","page":"Library","title":"Snowflake.coherent","text":"Snowflake.coherent(alpha, hspace_size)\n\nReturns a coherent state for parameter alpha in fock space of size hspace_size. Note that |alpha|^2 is equal to      photon number of the coherent state. \n\n# Examples\n\njulia> ψ = Snowflake.coherent(2.0,20);\n\njulia> print(ψ)\n20-element Ket:\n0.13533528323661270231781372785917483270168304443359375 + 0.0im\n0.2706705664732254046356274557183496654033660888671875 + 0.0im\n0.3827859860416437253261507804308297496944779411605434060697044368322244814859633 + 0.0im\n0.4420031841663186705315006220668383887063770056788388080454298547413058719111879 + 0.0im\n0.4420031841663186705315006220668383887063770056788388080454298547413058719111879 + 0.0im\n0.3953396664268989033516298387998153143981494385130297054512994395645417722835952 + 0.0im\n0.3227934859426706749083446895240143309122789082442331409841890434072244670369041 + 0.0im\n0.2440089396102658373848913914105868080225858281751344102479261185426274154783478 + 0.0im\n0.1725403758685577344434702345068468523504659376126805082402433361167676595291802 + 0.0im\n0.1150269172457051562956468230045645682336439584084536721601622240778451063527861 + 0.0im\n0.07274941014482606043765122911007029674853133081310976424472247415659623989683902 + 0.0im\n0.04386954494001140575894979175461054210856445342112420740912216424244799751166167 + 0.0im\n0.02532809358034196997591593372015585816248494654573845414140041049288863525802268 + 0.0im\n0.01404949847902665677216550321294394000313011924224810466364209088409881639691112 + 0.0im\n0.007509772823502763531724947918871845905858490361570411398782773832262018118359266 + 0.0im\n0.003878030010563633897440227516084030465660984499951448370503442999620168228954113 + 0.0im\n0.001939015005281816948720113758042015232830492249975724185251721499810084114477056 + 0.0im\n0.0009405604325217079112661845386949416195293171394724978755464370121167236584289665 + 0.0im\n0.0004433844399679012093293182780011289711800019436937749734346315219336842860352511 + 0.0im\n0.0002034387333640481868882144439914691756776463670619686354629916554722074664961924 + 0.0im\n\n\njulia> Snowflake.expected_value(Snowflake.number_op(20),ψ)\n3.999999793648639261230596388008292158320219007459973469036845972185905095821291 + 0.0im\n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.sesolve","page":"Library","title":"Snowflake.sesolve","text":"Snowflake.sesolve(H::Operator, ψ_0::Ket, t_range::StepRangeLen; e_ops::Vector{Operator}=(Operator)[], kwargs...)\nSnowflake.sesolve(H::Function, ψ_0::Ket, t_range::StepRangeLen; e_ops::Vector{Operator}=(Operator)[], kwargs...)\n\nSolves the Shrodinger equation:\n\nfracd Psid t=-i hatHPsi\n\nFields\n\nH – the Hamiltonian operator or a function that returns the Hamiltonian as a function of time.\nψ_0 – initital status of a quantum system\nt_range – time interval for which the system has to be simulated. \ne_ops – List of operators for which the expected value will be returned as function of time. \n\n\n\n\n\n","category":"function"},{"location":"library.html#Snowflake.mesolve","page":"Library","title":"Snowflake.mesolve","text":"Snowflake.mesolve(H::Operator, ψ_0::Ket, t_range::StepRangeLen; e_ops::Vector{Operator}=(Operator)[], kwargs...)\nSnowflake.mesolve(H::Function, ψ_0::Ket, t_range::StepRangeLen; e_ops::Vector{Operator}=(Operator)[], kwargs...)\n\nSolves the Lindblad Master equation:\n\ndotrho=-i H rho+sum_i gamma_ileft(L_i rho L^dag_i - frac12leftL^dag_i L_i rhorightright)\n\nFields\n\nH – the Hamiltonian operator or a function that returns the Hamiltonian as a function of time.\nψ_0 – initital status of a quantum system\nt_range – time interval for which the system has to be simulated. \ne_ops – List of operators for which the expected value will be returned as function of time. \nc_ops – List of collapse operators L_i's.\n\n\n\n\n\n","category":"function"},{"location":"library.html","page":"Library","title":"Library","text":"DocTestSetup = nothing","category":"page"},{"location":"qc/basics.html#What-is-Quantum-Computing?","page":"Basics","title":"What is Quantum Computing?","text":"","category":"section"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"DocTestSetup = :(using Snowflake)","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"Quantum computing is a new paradigm in high performance computing that utilizes the fundamental principles of quantum mechanics to perform calculations. Quantum computation holds great promise to outperform classical computers in some tasks such as prime factorization, quantum simulation, search, optimization, and algebraic programs such as machine learning.","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"The power of quantum computing stems from two fundemental properties of quantum mechanics, namely superposition and entanglement.","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"Snowflake is a Julia-based SDK for performing quantum computations. Quantum computation is achieved by building and executing quantum circuits. Comprised of quantum gates, instructions, and classical control logic, quantum circuits allow for expressing complex algorithms and applications in a abstract manner that can be executed on a quantum computer.","category":"page"},{"location":"qc/basics.html#Quantum-Circuits","page":"Basics","title":"Quantum Circuits","text":"","category":"section"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"Algorithms and applications that utilize quantum mechanical resources use a concept known as quantum circuit to represent the quantum operations. A quantum circuit is a computational pipeline consisting of a quantum register, and a classical register. Figure below shows an example of a 3-qubit quantum circuit.","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"(Image: Bell State generator circuit)","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"The qubits are designated on the left side of the figure with their inital state. The lines correspond to the time line of operations that are perfomed on qubits. The boxes and symbols then denote differnt single qubit or multi-qubit gates.","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"You can defined a quantum circuit with Snowflake through","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"julia> c = QuantumCircuit(qubit_count = 2, bit_count = 0)\nQuantum Circuit Object:\n   id: 0b7e9004-7b2f-11ec-0f56-c91274d7066f \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:\n     \nq[2]:\n  ","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"The above example creates a quantum circuit with two qubits and no classical bit and is now ready to be used to store quantum instuctions also known as quantum gates. ","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"tip: Circuit UUID\nNote the circuit object has been given a Universally Unique Identifier (UUID). This UUID can be used later to retrieve the circuit results from a remote server such as a quantum computer on the cloud.","category":"page"},{"location":"qc/basics.html#Quantum-Gates","page":"Basics","title":"Quantum Gates","text":"","category":"section"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"A quantum gate is a basic quantum operation that affects one or a number of qubits. Quantum gates are the building blocks of quantum circuits, like classical logic gates are for conventional digital circuits.","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"Unlike their classic counterparts, quantum gates are reversible. Quantum gates are unitary operators, and can be represented as unitary matrices.","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"Now let's add a few gates to our circuit using the following commands:","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"julia> push_gate!(c, [hadamard(1)])\nQuantum Circuit Object:\n   id: 0b7e9004-7b2f-11ec-0f56-c91274d7066f \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H--\n          \nq[2]:-----","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"Here use use the push_gate commands adds a Hadamrd gate, which will operate on qubit 1, to the quantum circuit object c.","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"julia> push_gate!(c, [control_x(1, 2)])\nQuantum Circuit Object:\n   id: 0b7e9004-7b2f-11ec-0f56-c91274d7066f \n   qubit_count: 2 \n   bit_count: 0 \nq[1]:--H----*--\n            |  \nq[2]:-------X--","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"The second line adds a CNOT gate (Control-X gate) with control qubit being qubit 1 and target qubit being qubit 2. ","category":"page"},{"location":"qc/basics.html#Quantum-Processor-Unit-(QPU)","page":"Basics","title":"Quantum Processor Unit (QPU)","text":"","category":"section"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"Quantum circuits cannot typically be immidiately executed on a quantum processor. This is because QPUs typically execute only a limited number of quantum gates directly on the hardware. Such gates are commonly referred to as native gates. This means that once a general quantum circuit is defined, it needs to be transpiled such that it only makes use of native gates for a given QPU . ","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"Snowflake introduces QPU to represent physical or virtual quantum processors. For example the following command creates a virtual QPU assuming it can implement Pauli matrices and Control-Z:","category":"page"},{"location":"qc/basics.html","page":"Basics","title":"Basics","text":"DocTestSetup = nothing","category":"page"},{"location":"qc/overview.html#Snowflake-Overview","page":"Snowflake Overview","title":"Snowflake Overview","text":"","category":"section"},{"location":"qc/overview.html","page":"Snowflake Overview","title":"Snowflake Overview","text":"DocTestSetup = :(using Snowflake)","category":"page"},{"location":"qc/overview.html","page":"Snowflake Overview","title":"Snowflake Overview","text":"Snowflake is a pure Julia quantum computing stack that allows you to easily design quantum circuits, algorithms, experiments and applications and run them on real quantum computers and/or classical simulators.","category":"page"},{"location":"qc/overview.html","page":"Snowflake Overview","title":"Snowflake Overview","text":"DocTestSetup = nothing","category":"page"},{"location":"index.html#Snowflake.jl","page":"Home","title":"Snowflake.jl","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"DocTestSetup = :(using Snowflake)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"A library for quantum computing using Julia","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Snowflake is a pure Julia quantum computing stack that allows you to easily design quantum circuits, algorithms, experiments and applications and run them on real quantum computers and/or classical simulators. ","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"warning: Warning\nThe documentation of Snowflake is still a work in progress. That being said, a lot can be learnt from the unit tests in the test folder.","category":"page"},{"location":"index.html#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Make sure your system has Julia (v.1.6 or a more recent version)   installed. If not, download the latest version from https://julialang.org/downloads/.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Launch Julia REPL and type","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"import Pkg\nPkg.add(\"Snowflake\")","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"If you intend to use a particular development branch from github repo, you can use the following commands","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"import Pkg\nPkg.add(url=\"https://github.com/anyonlabs/Snowflake.jl\", rev=\"BRANCH_NAME\")","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Note: Replace the BRANCH_NAME with the name of the branch you want to use. The stable release is main and the most up-to-date one is next.","category":"page"},{"location":"index.html#Get-Started","page":"Home","title":"Get Started","text":"","category":"section"},{"location":"index.html","page":"Home","title":"Home","text":"Like other Julia Packages, you can use Snowflake in a Julia REPL, in a Julia script, or in a notebook.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"A typical workflow to use a quantum computer consists of the following four steps:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Build: Design a quantum circuit(s) that represents the problem you are considering.\nCompile: Compile circuits for a specific quantum service, e.g. a quantum system or classical simulator.\nRun: Run the compiled circuits on the specified quantum service(s). These services can be cloud-based or local.\nPostprocess: Compute summary statistics and visualize the results of the experiments.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Now let's try Snowflake by making a two qubit circuit which implements a Bell/EPR state. The quantum circuit achiving a Bell state involves a Hadamard gate on one of the qubits followed by a CNOT gate (see https://en.wikipedia.org/wiki/Quantumlogicgate for an introduction to quantum logic gates). This circuit is show below:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"(Image: Bell State generator circuit)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"First import Snowflake:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"using Snowflake","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Then lets define a two qubit circuit:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"c = QuantumCircuit(qubit_count=2, bit_count=0)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"If you are using Julia REPL you should see an output similar to:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Quantum Circuit Object:\n   id: 1e9c4f6e-64df-11ec-0c5b-036aab5b72cb\n   qubit_count: 2\n   bit_count: 0\nq[1]:\n\nq[2]:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Note the circuit object has been given a Universally Unique Identifier (UUID). This UUID can be used later to retrieve the circuit results from a remote server such as a quantum computer on the cloud.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Now let's build the circuit using the following commands:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"push_gate!(c, [hadamard(1)])\npush_gate!(c, [control_x(1, 2)])","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The first line adds a Hadamrd gate to circuit object c which will operate on qubit 1. The second line adds a CNOT gate (Control-X gate) with control qubit being qubit 1 and target qubit being qubit 2. The output in Julia REPL would look like:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Quantum Circuit Object:\n   id: 1e9c4f6e-64df-11ec-0c5b-036aab5b72cb\n   qubit_count: 2\n   bit_count: 0\nq[1]:--H----*--\n            |\nq[2]:-------X--","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Note: Unlike C++ or Python, indexing in Julia starts from \"1\" and not \"0\"!","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Finally you can simulate this circuit and obtain the final quantum state of this two-qubit register:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"ψ = simulate(c)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"which would give:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"4-element Ket:\n0.7071067811865475 + 0.0im\n0.0 + 0.0im\n0.0 + 0.0im\n0.7071067811865475 + 0.0im","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"Note: Snowflake always assumes a qubit is initialized in state 0.","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"The script below puts all the steps above together:","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"using Snowflake\n\nc = QuantumCircuit(qubit_count=2, bit_count=0)\npush_gate!(c, [hadamard(1)])\npush_gate!(c, [control_x(1, 2)])\nψ = simulate(c)","category":"page"},{"location":"index.html","page":"Home","title":"Home","text":"DocTestSetup = nothing","category":"page"},{"location":"simulating_quantum_systems.html#Simulating-Quantum-Systems","page":"Simulating Quantum Systems","title":"Simulating Quantum Systems","text":"","category":"section"},{"location":"simulating_quantum_systems.html","page":"Simulating Quantum Systems","title":"Simulating Quantum Systems","text":"DocTestSetup = :(using Snowflake)","category":"page"},{"location":"simulating_quantum_systems.html","page":"Simulating Quantum Systems","title":"Simulating Quantum Systems","text":"Snowflake provides capability to directly simulate a quantum system on a classical computer. The following sections of this page provide you with documentation and examples of how to achieve that.","category":"page"},{"location":"simulating_quantum_systems.html","page":"Simulating Quantum Systems","title":"Simulating Quantum Systems","text":"Note that using a quantum computer does not involve using these objects. But, simulating the operation of a quantum computer, or any quantum system for that matter, on a classical computer does!","category":"page"},{"location":"simulating_quantum_systems.html#Basic-Quantum-Objects","page":"Simulating Quantum Systems","title":"Basic Quantum Objects","text":"","category":"section"},{"location":"simulating_quantum_systems.html","page":"Simulating Quantum Systems","title":"Simulating Quantum Systems","text":"There are three basic quantum objects defined in Snowflake to simulate a Quantum system. These objects are Ket, Bra, and Operator.","category":"page"},{"location":"simulating_quantum_systems.html#Multibody-Systems","page":"Simulating Quantum Systems","title":"Multibody Systems","text":"","category":"section"},{"location":"simulating_quantum_systems.html","page":"Simulating Quantum Systems","title":"Simulating Quantum Systems","text":"MultiBodySystem structures are used to represent quantum multi-body systems. After defining a multi-body system, it is possible to build an operator for this system given a local operator (e.g. one which acts on a qubit). An operator for a multi-body system can be obtained by calling get_embed_operator.","category":"page"},{"location":"simulating_quantum_systems.html#Fock-Space","page":"Simulating Quantum Systems","title":"Fock Space","text":"","category":"section"},{"location":"simulating_quantum_systems.html","page":"Simulating Quantum Systems","title":"Simulating Quantum Systems","text":"A Ket which represents a bosonic Fock space can be created by calling fock.","category":"page"},{"location":"simulating_quantum_systems.html","page":"Simulating Quantum Systems","title":"Simulating Quantum Systems","text":"DocTestSetup = nothing","category":"page"}]
}
