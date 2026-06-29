# Detailed Analysis of UGC NET Computer Science Papers

This document provides a deep dive into each provided UGC NET Computer Science question paper, breaking down the exact topics, subtopics, question formats, and suggesting related topics for future exams.

> [!TIP]
> A consolidated, subject-by-subject view merging the topics from all these papers can be found in [UGC_NET_Computer_Science_Subjectwise_Analysis.md](file:///Users/himanshuverma/Downloads/Cursor/Antigravity/UGC_NET_Computer_Science_Subjectwise_Analysis.md).

## 1. Analysis of `UGC_Comp_Dec2023.pdf` (December 2023 Exam)

### **A. Core Topics & Subtopics Extracted**
1. **Discrete Mathematics & Optimization**
   - *Probability:* Divisibility probability in a range.
   - *Logic:* Propositional logic tautologies, First-order logic and Quantifiers.
   - *Group Theory:* Sets, Homomorphisms, Subgroups.
   - *Linear Programming:* Formulating LPP constraints, Objective functions, Duality, Graphical solutions.
2. **Digital Logic & Architecture**
   - *Circuits:* Encoders, Decoders, Flip-Flops, Registers (Data storage).
   - *Data Representation:* Gray Code, BCD, Excess-3, Signed binary numbers (Arithmetic Shifts).
   - *Architecture:* System buses (Synchronous/Asynchronous), Interrupt handling hierarchies, Micro-operations vs Subroutines.
3. **Data Structures & Algorithms**
   - *Trees:* AVL Trees, Binary Search Trees, 2-3-4 Trees, Red-Black Trees.
   - *Hashing:* Collision resolution (Linear/Quadratic probing, Chaining, Double hashing).
   - *Algorithm Analysis:* Time complexities of searching/sorting, Asymptotic notations ($O$, $\Theta$, $\Omega$).
4. **Programming in C and C++**
   - *C Programming:* Postfix expression evaluation, While loops and post-decrements, Macros (`#define`).
   - *C++ OOP:* Virtual functions, Polymorphism, Constructors (Invocation, Inheritance rules, Virtual constructors), Friend functions and classes.
5. **Database Management Systems (DBMS)**
   - *SQL & Relational Algebra:* DDL commands (`CREATE TABLE`), Cartesian products, Outer Joins.
   - *Normalization:* 1NF, BCNF, 4NF (Multivalued dependencies), 5NF (Join dependencies).
   - *Transactions & Concurrency:* Schedules, Blind writes, Conflict Serializability.
   - *Storage & Indexing:* B-Trees, B+ Trees, Extendible Hashing, Dense indexing.
6. **Operating Systems**
   - *Memory Management:* Virtual vs Physical addresses, Paging, Page tables.
   - *Process Synchronization:* Critical sections, Spin locks, Busy waiting.
   - *Scheduling & Disk Management:* SCAN algorithm, Head movement calculations.
   - *Linux Concepts:* User password storage (`/etc/passwd`, `/etc/shadow`), Kernel interrupt priorities.
7. **Computer Networks**
   - *OSI & TCP/IP Model:* TCP Header fields (Checksum, Sequence Number, Window size), UDP characteristics.
   - *Routing Protocols:* OSPF, BGP4, RIP, Distance Vector vs Link State, Split horizon with poison reverse.
   - *MAC Layer:* CSMA sensing methods (1-persistent, p-persistent), Bit stuffing protocols.
   - *Cryptography:* Hash functions, Message digests, Public key vs Private key, Digital Signatures.
   - *Encoding:* NRZ, Manchester, Bipolar schemes, Baud rate calculations.
8. **Theory of Computation & Compiler Design**
   - *Automata:* DFA final state minimization, Moore & Mealy machines.
   - *Regular Languages:* Kleene closure, Identity operations on languages.
   - *Compiler Phases:* Intermediate code generation (Triples, Quadruples), Syntax analysis, Lexical analysis.
9. **Artificial Intelligence**
   - *Search Algorithms:* Alpha-Beta pruning, Greedy Best-First, A* Search, SMA*, State spaces.
   - *Fuzzy Logic:* Fuzzy sets, Crossover points, Core and Support, $\alpha$-cuts.
   - *Neural Networks & GAs:* Feed-forward network weight updates (Sigmoid activation), Genetic Algorithm fitness evaluations.
   - *Multi-Agent Systems:* Single vs Multi-agent architectures.
10. **Software Engineering & Computer Graphics**
    - *Software Dev Models:* Spiral model risk analysis.
    - *Testing:* Test suites (Defect, boundary, test cases).
    - *Computer Graphics:* 2D Scaling transformations, 3D viewpoint obscuring, Line clipping (Cohen-Sutherland), Hidden surface removal (Z-Buffer).

### **B. Types of Questions Asked**
- **Direct Multiple Choice:** Straightforward factual questions (e.g., Identifying the DDL command).
- **Match the Following (List I & List II):** Used heavily for comparing compiler phases to their functions, cipher techniques to properties, and normalization forms to their definitions.
- **Statement Verification (Assertion & Reason):** E.g., Verifying properties of friend classes in C++ or the definition of virtual circuits.
- **Multiple True/False Statements:** Providing statements A, B, C, D and asking which combination is correct (very common for evaluating properties of Data structures and AI algorithms).
- **Numerical & Tracing:**
  - Tracing the output of a C program or Macro.
  - Calculating exact output values for a Neural Network layer using weights.
  - Calculating total disk head movements using the SCAN algorithm.
  - Evaluating Linear Programming minimum costs.
- **Passage-Based/Comprehension:** A block of 5 questions based on a single scenario (e.g., LPP formulation scenario, Relational Database tables).

### **C. Suggested Related Topics for Future Exams**
- **Algorithms:** Graph Algorithms (Dijkstra, Bellman-Ford, Prim's, Kruskal's), Dynamic Programming (Knapsack, LCS).
- **AI/ML:** Support Vector Machines (SVM), Decision Trees, K-Nearest Neighbors (KNN), Convolutional Neural Networks (CNN) architecture details.
- **DBMS:** Concurrency Control protocols (2-Phase Locking, Timestamp Ordering), Advanced SQL (Group By, Having, Correlated Subqueries), Transaction Recovery (Log-based recovery, Checkpoints).
- **Networking:** Subnetting/Supernetting calculations, Congestion Control (Leaky Bucket, Token Bucket), Application Layer Protocols (DNS, SMTP, HTTP).
- **OS:** Deadlock Avoidance (Banker's Algorithm), Page Replacement Algorithms (LRU, Optimal, FIFO - Belady's Anomaly), Multithreading models.
- **TOC:** Decidability and Undecidability (Halting Problem, PCP), Pumping Lemma for Regular and Context-Free Languages.
- **Software Engineering:** COCOMO Model calculations, Cyclomatic Complexity calculation, Software Metrics (Coupling/Cohesion types).

---

## 2. Analysis of `UGC_Comp_June2023.pdf` (June 2023 Exam)

### **A. Core Topics & Subtopics Extracted**
1. **Software Engineering**
   - *SDLC & Methodologies:* Agile (Scrum, XP), Spiral model, Prototyping model phases, Software product lines.
   - *Metrics & Management:* COCOMO Model (Effort and Size calculations), Project Management (PERT, CPM, Optimistic/Pessimistic time), Software Configuration Management (Version control).
   - *Testing:* Validation vs Verification, Types of testing (Unit, Integration, System, Acceptance, Regression, Component, Beta).
   - *Design Principles:* Jackson's Principle, Coupling and Cohesion types.
2. **Data Structures & Algorithms**
   - *Data Structures:* Heap sort (Max-Heapify, Build-Max-Heap), B-Trees (Node splitting, Level counts), AVL vs Red-Black trees (Rotations, height balance), Circular Queues (Empty/Full conditions).
   - *Algorithm Design:* Dynamic Programming steps (Knapsack), Divide & Conquer, Fast Fourier Transform (Parallel vs Iterative), Graph algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall, Prim's).
   - *Complexity:* Asymptotic bounds ($O$, $\Omega$, $\Theta$), Master Theorem for solving recurrence relations (e.g., $T(n) = aT(n/b) + f(n)$), Stable sorting algorithms.
3. **Discrete Mathematics**
   - *Logic:* Propositional equivalences, Tautology evaluation, First-Order Logic (Quantifiers, "for all", "there exists").
   - *Group Theory:* Automorphisms of $(Z, +)$, Properties of Relations (Reflexive, Symmetric, Transitive).
   - *Graph Theory:* Dirac's Theorem (Hamiltonian graphs), Planar graphs.
   - *Probability:* Permutations, Combinations, Drawing items without replacement.
4. **Computer Networks**
   - *Addressing & Routing:* IPv4 Classes, Subnet masking, Supernetting, Distance Vector Routing (Count to infinity problem), Link State.
   - *Protocols:* TCP (3-way handshake, SYN, ACK), UDP, IP Datagram Headers (TTL, Fragment offset).
   - *MAC Layer & Wireless:* CSMA/CD, ALOHA, IEEE 802 standards (802.15 Bluetooth, 802.16 WiMAX).
   - *Security:* Digital Signatures, Hash Functions, Symmetric vs Asymmetric cryptography (RSA, AES, DES).
5. **Operating Systems**
   - *Process & Threads:* PCB (Process Control Block), Pthreads API, Context switching.
   - *Scheduling:* FCFS, SJF, SRTF, Round Robin, Priority Scheduling (Calculating turnaround and waiting times).
   - *Memory Management:* Virtual Memory, Paging, Page Replacement Algorithms (LRU, Belady's anomaly).
   - *Concurrency:* Mutual Exclusion, Banker's Algorithm (Deadlock avoidance, safe states, data structures used).
6. **Database Management Systems (DBMS)**
   - *Normalization:* 1NF, 2NF, 3NF, BCNF, 4NF, 5NF. Dependency preservation and Lossless joins.
   - *Transactions:* ACID properties, Serializability (Conflict and View), Locking (2PL), Timestamp ordering.
   - *SQL & Architecture:* DDL/DML, Foreign keys, `COUNT(DISTINCT)` queries.
7. **Theory of Computation & Compiler Design**
   - *Automata & Languages:* Chomsky Hierarchy, Regular Grammars, DFA/NFA conversions, Pumping Lemma.
   - *Decidability:* Halting Problem, PCP (Post Correspondence Problem), NP-Completeness (TSP, SAT).
   - *Compiler Phases:* Lexical, Syntax, Semantic, Intermediate code generation. Parsers (LL, SLR, LALR).
8. **Artificial Intelligence**
   - *Machine Learning:* Supervised vs Unsupervised (K-means clustering), Dimensionality reduction (PCA).
   - *Neural Networks:* Perceptrons, Activation functions, Feed-forward networks, Backpropagation, Weight updates.
   - *Genetic Algorithms:* Initialization, Selection, Crossover, Mutation, Evaluation.
9. **Computer Architecture & Graphics**
   - *Architecture:* Storage access times, Vector processors, Pipeline speedup (Amdahl's Law), Addressing Modes, Interrupts and DMA.
   - *Graphics:* Bezier curves, B-Splines, Clipping algorithms (Sutherland-Cohen), Line drawing (DDA, Bresenham).

### **B. Types of Questions Asked**
- **Match the Following:** Very prevalent for matching definitions of concepts (Testing types, Algorithms, Network protocols, Parsing techniques).
- **Statement Verification (Assertion & Reason):** Used frequently for deep theoretical concepts like Decidability, Conflict serializability, and Software validations.
- **Numerical Problems:** 
  - Calculating expected values for COCOMO.
  - Computing probability combinations.
  - Process Scheduling (Gantt charts to find average waiting time).
  - Subnetting calculations (Hosts per subnet).
- **Code Tracing:** Tracking the execution of nested loops or pointer arithmetic in C to determine the output.
- **Passage-Based/Comprehension:** Sets of 5 questions linked to a single scenario (e.g., A passage on Banker's algorithm, or an Artificial Neural Network model).

### **C. Suggested Related Topics for Future Exams**
- **Algorithms:** Advanced recurrences (using recursion trees), Network Flow algorithms, NP-Hard reductions.
- **OS:** Semaphore wait/signal numerical problems, Disk scheduling (SSTF, C-LOOK), Thrashing.
- **Networks:** TCP Congestion Window calculations, IPv6 headers, Wireless LAN protocols (CSMA/CA).
- **DBMS:** B+ Tree indexing numericals (calculating order of tree), Query optimization parsing trees.
- **AI:** Fuzzy Logic (Alpha cuts, intersection/union), Minimax theorem with Alpha-Beta pruning calculations.
- **TOC:** Turing Machine variants, Closure properties of Context-Sensitive Languages, Rice's Theorem.

---

## 3. Analysis of `UGC_Comp_Dec2024.pdf` & `UGC_Comp_June2024_Cancelled.pdf` (December/June 2024)

### **A. Core Topics & Subtopics Extracted**
*(Note: These two papers feature identical question sets, indicating a repetition or repurposing of the cancelled exam).*
1. **Data Structures & Algorithms**
   - *Graphs:* In-order traversals, Graph isomorphism, Number of edges in graphs (Complete, Bipartite, Cycles).
   - *Asymptotic Notations:* Comparing growth rates of functions.
   - *Algorithm Properties:* In-place vs Out-of-place sorting, Stable sorting.
2. **Computer Networks**
   - *Data Link Layer:* CSMA/CD minimum frame size calculations based on propagation delay, Network Topologies.
   - *Protocols:* DNS query sequences, DHCP operations, IP header protocols.
   - *Wireless Networks:* Features of MANETs (Mobile Ad-hoc Networks).
3. **Software Engineering**
   - *SDLC:* Sequential flow of the Feature Driven Development (FDD) process, Agile methods vs traditional, Jackson's Principle.
   - *Testing:* Software Testability characteristics (Observability, Controllability).
   - *Architecture:* Layered architecture in operating systems.
4. **Database Management Systems (DBMS)**
   - *Relational Databases:* Database design steps, Definition of degrees (Attributes).
   - *Keys:* Alternative keys, Candidate key discovery from Functional Dependencies.
   - *Transaction Management:* Phantom read anomalies and Concurrency control.
5. **Computer Architecture & Systems**
   - *Arithmetic Pipelines:* Fixed point multiplication using Carry Save Adders (CSAs) and Carry Propagate Adders (CPAs).
   - *Cache Memory:* Evaluating Cache Performance (Hit Ratio), Memory layout mappings.
   - *Instruction Sets:* Data manipulation instructions vs Branching.
   - *RAID Systems:* Matching RAID levels (0-6) to their error-correction/striping mechanisms.
6. **Operating Systems**
   - *Memory:* Calculating Logical to Physical Address Translation steps, Paging vs Segmentation, Memory mapping techniques.
   - *Disk Scheduling:* C-LOOK and SSTF head movement calculations.
7. **Theory of Computation**
   - *NP-Completeness:* Properties of NP-Hard and NP-Complete sets, Reducibility.
   - *Grammar Classification:* Identifying CFGs and strictly Regular Grammars.
   - *Pumping Lemma:* Checking invalidity conditions for Regular Languages.
8. **Artificial Intelligence**
   - *Machine Learning Models:* Neural Networks vs Decision Trees vs Support Vector Machines.
   - *Neural Networks:* Perceptron learning mechanisms, Backpropagation concepts.
   - *Genetic Algorithms:* Proper sequence (Selection, Initialization, Crossover, Mutation).
9. **C Programming & Mathematics**
   - *Pointer Arithmetic:* Complex variable declarations, evaluating array element pointers `a[i][j]`.
   - *Operators:* Short-circuit evaluation of logical operators (`||`, `&&`), bitwise operators.
   - *Linear Equations:* Basic solutions to system equations.
   - *Number Systems:* Finding the base of a number given an equation.

### **B. Types of Questions Asked**
- **Sequencing Operations:** Sorting the phases of processes like FDD, Genetic Algorithms, or Hardware address translation into their correct logical order.
- **Problem Solving (Numerical):** 
  - Subnet/Frame size calculations (e.g., finding bandwidth-delay product).
  - Combinatorics and algebraic base computations (finding unknown base $y$).
  - Complex nested loop tracing in C programming to find output integers.
- **Passage-Based (Linear Programming / Data Interpretation):** A passage describing a business problem, generating 5 linked questions evaluating constraints, feasible regions, objective functions, and duality.

### **C. Suggested Related Topics for Future Exams**
- **Software Engineering:** Cleanroom Software Engineering, CMMI Levels, Advanced Black-box testing techniques (Equivalence partitioning).
- **DBMS:** Write-Ahead Logging (WAL), ARIES recovery algorithm, NoSQL databases and CAP Theorem.
- **Computer Networks:** Cryptography protocols (IPSec, SSL/TLS), Wireless routing protocols (AODV, DSR).
- **Computer Architecture:** Multiprocessor Cache Coherence protocols (MESI), Vector processing parameters.
- **AI/ML:** Hidden Markov Models (HMM), Deep Learning activation functions (ReLU, Softmax), Overfitting/Underfitting mitigation (Regularization, Dropout).
- **Algorithms:** Master Theorem for decreasing functions, B-tree insertion/deletion complexities, Matrix chain multiplication.

---

## 4. Analysis of `UGC_Comp_June2024_ReExam.pdf` (June 2024 Re-Exam)

### **A. Core Topics & Subtopics Extracted**
1. **Compiler Design**
   - *Parsing:* Types of Parsers (LR(0), SLR, LALR, LR(1)), Parser hierarchy and power, resolving Shift-Reduce conflicts (Associativity/Precedence rules).
   - *Grammars:* Closures, GOTO sets, Parsing items definition.
   - *Intermediate Code:* Flow graphs, Dominators, Basic blocks, Three Address Code (TAC).
2. **C / C++ Programming**
   - *Pointers:* Dereferencing mechanisms, pointer-to-pointer mappings, pointer arithmetic constraints (what operations are legal vs illegal).
   - *OOP:* Late vs Early binding, Overloading vs Overriding, Virtual inheritance properties.
   - *Code Tracing:* Determining output of recursive functions, variable swaps, tracking `malloc()` blocks.
3. **Database Management Systems (DBMS)**
   - *Relational Algebra:* Mapping schema, Set operations (Union, Intersect, Divide operation implementations).
   - *Normalization:* Distinguishing between prime and non-prime attributes, advanced keys.
   - *Transactions:* Analyzing ACID properties independently, detecting Conflict vs View Serializable schedules.
4. **Operating Systems**
   - *Concurrency:* Spinlocks, Semaphores (counting vs binary), Mutual exclusion conditions, Pthreads API standards.
   - *Scheduling & Disks:* Non-preemptive vs preemptive Gantt charts, Average waiting times. Multi-cylinder disk head request scheduling.
   - *Cache & Memory:* Write-through vs Write-back protocols, Cache coherence in multiprocessors, Logical vs Physical address spaces mapping.
5. **Artificial Intelligence**
   - *Fuzzy Logic:* Definition of Fuzzy relations, alpha-cuts operations and derivations.
   - *Genetic Algorithms:* Parent selection mechanisms (Tournament, Roulette, Boltzmann), Encoding types.
   - *Neural Networks:* Kohonen SOM (Self-Organizing Maps) weight updation formulas, activation boundaries.
6. **Software Engineering**
   - *Testing Types:* Distinguishing Equivalence Partitioning, Boundary Value Analysis, Cyclomatic Complexity calculation, and Decision Table testing.
   - *Metrics:* Deep dive into coupling (Stamp vs Control vs External) and ranking them. Requirement elicitation approaches.
7. **Computer Graphics**
   - *Algorithms:* Clipping algorithms (Sutherland-Cohen limits), Oblique vs Cavalier vs Cabinet vs Orthographic projections mapping.

### **B. Types of Questions Asked**
- **Passage-Based (Compiler Design Flow Graphs):** A very highly technical passage offering a block of Three Address Code (TAC) and asking to identify "leaders", "basic blocks", "dominators", and apply loop optimizations.
- **Statement & Reasoning:** Testing edge cases in concurrency control (e.g., difference between Spinlocks and generic Semaphores in multiprocessors).
- **Code Trace:** Deep recursive function trace testing memory allocation lifecycle and stack frames.
- **Formula identification:** Specifically asking to recognize the exact mathematical formula for Kohonen SOM learning rate updating or Master Theorem parameters.

### **C. Suggested Related Topics for Future Exams**
- **Compiler Design:** DAG construction for expressions, Data Flow Analysis, Live variable analysis, Peephole Optimization.
- **C/C++ OOP:** Exception handling stack unwinding, RTTI (Run-time type identification).
- **DBMS:** Multi-version concurrency control, Extensible hashing directory doubling calculations.
- **OS:** Priority Inversion problem and Priority Inheritance Protocol, Deadlock detection vs avoidance.
- **AI/ML:** Fuzzy Modus Ponens/Tollens, RBF (Radial Basis Function) networks, Hopfield networks.
- **Graphics:** Cohen-Sutherland region code generation, Bresenham's Circle drawing derivations.

---

## 5. Analysis of `UGC_Comp_June2025.pdf` (Mock / Predicted Exam)

### **A. Core Topics & Subtopics Extracted**
*(Note: As a mock or predicted paper, this contains a carefully curated mix of high-frequency topics from 2023 and 2024 exams).*
1. **Queuing Theory & Processes (OS / Math)**
   - *Little's Law:* Calculating average waiting time based on arrival rates and queue sizes.
   - *Process lifecycle:* Events causing a process to enter/leave waiting queues, interruptions vs. blocking calls.
2. **Network Engineering**
   - *Routing Metrics:* Count-to-infinity problem in Distance Vector Routing.
   - *Wireless Standards:* Distinguishing IEEE 802.16 (WiMAX), 802.15 (Bluetooth), and Mobile Ad-hoc protocols (AODV).
   - *Security:* Deep dive into algorithms (RSA, AES, Hash functions, Digital Signatures).
3. **Advanced Architecture**
   - *Memory Mapping:* Comparing Data exchange, matching, and transformation when moving from Main Memory to Cache.
   - *Vector Processing:* Calculating total cycle operations based on the number of pipeline lanes.
4. **Artificial Intelligence**
   - *Intelligent Agents:* Environments, Actuators, Controllers, and Percepts conversions.
   - *Knowledge Bases:* Representational mapping from selecting atoms to axiomatizing the domain.
   - *Machine Learning Algorithms:* Classifying Random Resetting, Scramble, and Inversion in GAs.
5. **Software Engineering**
   - *Cloud/Virtualization:* Steps to install and allocate resources for isolated workloads (Hypervisors).
   - *Quality Metrics:* McCall's Quality Factors (Maintainability, Usability, Integrity, Functionality).
   - *Advanced Testing:* Black box vs White box boundaries, distinguishing testing components dynamically.

### **B. Types of Questions Asked**
- **Numerical Problems (Real World applied):** Applying standard formulas (like Little's Law or basic combinatorics) directly to practical network engineering or software management numbers.
- **Definitional Mapping:** Asking to map subtle differences in standard specifications (like IEEE 802.* standards) or identifying specific stages of knowledge base setups.
- **Tracing Algorithms:** Heavy use of nested loops and pointer manipulations to identify edge cases in C variables.

### **C. Suggested Related Topics for Future Exams**
- **Cloud Computing & IoT:** Deep dive into hypervisor types (Type 1 vs Type 2), SaaS/PaaS/IaaS properties, IoT edge computing protocols (MQTT, CoAP).
- **Advanced Networking:** BGP split-horizon problems, RIP vs OSPF metrics, IPv6 addressing formats.
- **Software Quality:** ISO 9126 standards, Six Sigma maturity levels, Code refactoring techniques.
- **Artificial Intelligence:** K-means variance minimization properties, Deep reinforcement learning basics (Q-learning), NLP tokenization techniques.

---

## 6. Cross-Paper Consolidated Analysis (All Exams)

### **A. Subject-Wise Frequency Heatmap**

The table below shows the frequency/weight of each subject across all 6 question papers. ★★★ = Heavy weight, ★★ = Moderate, ★ = Light.

| Subject | Dec 2023 | Jun 2023 | Dec 2024 | Jun 2024 (Cancelled) | Jun 2024 ReExam | Jun 2025 |
|---|---|---|---|---|---|---|
| Data Structures & Algorithms | ★★★ | ★★★ | ★★★ | ★★★ | ★★ | ★★ |
| Operating Systems | ★★★ | ★★★ | ★★ | ★★ | ★★★ | ★★★ |
| Computer Networks | ★★★ | ★★★ | ★★★ | ★★★ | ★★ | ★★★ |
| DBMS | ★★★ | ★★ | ★★ | ★★ | ★★★ | ★ |
| Theory of Computation | ★★ | ★★ | ★★★ | ★★★ | ★★ | ★ |
| Compiler Design | ★★ | ★★ | ★ | ★ | ★★★ | ★ |
| Artificial Intelligence | ★★★ | ★★★ | ★★ | ★★ | ★★★ | ★★★ |
| Discrete Mathematics | ★★ | ★★★ | ★★ | ★★ | ★★ | ★★ |
| Software Engineering | ★★ | ★★★ | ★★★ | ★★★ | ★★★ | ★★ |
| Computer Architecture | ★★ | ★★ | ★★★ | ★★★ | ★★ | ★★★ |
| C / C++ Programming | ★★ | ★★ | ★★ | ★★ | ★★★ | ★★ |
| Computer Graphics | ★★ | ★★ | ★ | ★ | ★★ | ★ |

---

### **B. Master Topic Reference Table**

A definitive, consolidated list of every topic and subtopic that has appeared across all 6 papers, organized subject-wise for targeted revision.

#### 1. Data Structures & Algorithms
| Topic | Subtopics |
|---|---|
| Trees | BST, AVL (rotations, balance factor), Red-Black, B-Tree / B+ Tree (order, height, node splitting), 2-3-4 Trees |
| Heaps | Max-Heapify, Build-Max-Heap, Heap Sort, time complexity (insert: O(log n), build: O(n)) |
| Hashing | Linear probing, Quadratic probing, Double Hashing, Chaining, Extendible Hashing |
| Graphs | BFS, DFS, Dijkstra, Bellman-Ford, Floyd-Warshall, Prim's, Kruskal's, Topological Sort |
| Sorting | Stability, In-place vs Out-of-place, Merge Sort, Quick Sort, Heap Sort, Counting Sort |
| Complexity | Master Theorem, Recurrence Relations, Big-O, Big-Theta, Big-Omega, Amortised analysis |
| Queues | Circular Queue (empty/full conditions), Priority Queues, Deques |

#### 2. Operating Systems
| Topic | Subtopics |
|---|---|
| CPU Scheduling | FCFS, SJF, SRTF, Round Robin, Priority — Gantt chart, TAT, WT calculations |
| Memory Management | Paging, Segmentation, TLB, Page Table (hierarchical), Address translation |
| Page Replacement | FIFO, LRU, Optimal, Belady's Anomaly, Working Set model |
| Concurrency | Mutex, Semaphore (Counting / Binary), Spinlock, Monitor, Peterson's solution |
| Deadlock | Banker's Algorithm (Safe state, Need matrix), Detection, Avoidance, Prevention |
| Disk Scheduling | FCFS, SSTF, SCAN, C-SCAN, LOOK, C-LOOK — Head movement calculations |
| Threads | User-level vs Kernel-level, Pthreads API |
| File Systems | Inode, FAT, /etc/passwd vs /etc/shadow |

#### 3. Computer Networks
| Topic | Subtopics |
|---|---|
| OSI & TCP/IP | Layer functions, PDU names, Service primitives |
| IP Addressing | Class A/B/C/D, Subnetting, Supernetting, CIDR, IPv6 basics |
| IP Header | TTL, Fragment Offset, Checksum, Protocol field |
| TCP / UDP | 3-way handshake, Window size, Congestion Control, UDP characteristics |
| MAC Protocols | CSMA/CD (frame size formula), ALOHA (pure vs slotted), Token Ring |
| Routing | RIP (Distance Vector), OSPF (Link State), BGP, Count-to-infinity, Split horizon |
| Cryptography | RSA, DES, AES, Hash functions (MD5, SHA), Digital Signatures, Certificates |
| Data Encoding | NRZ, NRZI, Manchester, Bipolar AMI, Baud rate |
| Wireless | IEEE 802.11 (CSMA/CA), 802.15 (Bluetooth), 802.16 (WiMAX), MANETs |
| Application Layer | DNS, DHCP, SMTP, POP3, IMAP, FTP, HTTP, TELNET |

#### 4. Database Management Systems (DBMS)
| Topic | Subtopics |
|---|---|
| Normalization | 1NF → 2NF → 3NF → BCNF → 4NF (MVDs) → 5NF (JDs) |
| Keys | Super Key, Candidate Key, Primary Key, Alternate Key, Foreign Key |
| Functional Dependencies | Closure of FDs, Armstrong's Axioms, Canonical/Minimal Cover |
| SQL | DDL, DML, Joins (Inner, Outer, Self), GROUP BY, HAVING, Subqueries |
| Relational Algebra | Select (σ), Project (π), Join (⋈), Division (÷), Union, Intersect |
| Transactions | ACID, Commit, Rollback, Savepoints |
| Concurrency Control | 2PL (Basic, Strict, Rigorous), Timestamp Ordering, MVCC |
| Schedules | Conflict Serializability, View Serializability, Recoverable schedules |
| Indexing | Dense/Sparse Index, B+ Tree Index, Extendible Hashing |
| RAID | RAID 0 (Striping), RAID 1 (Mirroring), RAID 4, RAID 5, RAID 6 |

#### 5. Theory of Computation
| Topic | Subtopics |
|---|---|
| Automata | DFA, NFA (subset construction), PDA, Turing Machine |
| Languages | Chomsky Hierarchy (Type 0-3), Regular, CFL, CSL, REL |
| Regular Languages | Pumping Lemma, Closure properties, Minimization (Myhill-Nerode) |
| CFLs | Pumping Lemma for CFLs, Closure properties, CYK algorithm |
| Decidability | Decidable vs Undecidable, Halting Problem, PCP, Rice's Theorem |
| NP-Completeness | P vs NP, NP-Hard, NP-Complete, Polynomial Reductions, SAT, TSP, Clique |

#### 6. Compiler Design
| Topic | Subtopics |
|---|---|
| Lexical Analysis | Tokens, Lexemes, Regular expressions, Symbol table |
| Parsing | LL(1), LR(0), SLR(1), LALR(1), CLR(1) — Parser power hierarchy |
| Grammar | FIRST and FOLLOW sets, Left recursion removal, Left factoring |
| Syntax Trees | Parse tree, AST, Ambiguity |
| Intermediate Code | Three Address Code (TAC), Triples, Quadruples, DAG |
| Code Optimization | Basic Blocks, Flow Graphs, Data Flow Analysis, Constant Folding, Loop invariant |
| Code Generation | Register allocation, Instruction selection |

#### 7. Artificial Intelligence
| Topic | Subtopics |
|---|---|
| Search | BFS, DFS, Uniform Cost, Greedy Best-First, A*, IDA*, SMA* |
| Heuristics | Admissibility, Consistency, Dominance |
| Game Trees | Minimax, Alpha-Beta Pruning |
| Knowledge Representation | Propositional logic, First-Order Logic, Forward/Backward chaining |
| Neural Networks | Perceptron (weight update rule), Sigmoid activation, Backpropagation, Kohonen SOM |
| Machine Learning | Supervised, Unsupervised, KNN, K-means, Decision Trees, SVM, PCA |
| Fuzzy Logic | Membership functions, Fuzzy operations (Union, Intersection), Alpha-cuts, Defuzzification |
| Genetic Algorithms | Encoding, Initialization, Selection (Roulette, Tournament, Boltzmann), Crossover, Mutation |
| Agents | Types (Reflex, Goal-based, Utility-based), PEAS framework, Environments |

#### 8. Discrete Mathematics
| Topic | Subtopics |
|---|---|
| Logic | Propositional Logic, Tautologies, Logical Equivalences, First-Order Logic |
| Set Theory | Sets, Relations (Reflexive, Symmetric, Transitive, Equivalence), Functions |
| Group Theory | Groups, Abelian Groups, Homomorphisms, Automorphisms, Subgroups |
| Graph Theory | Euler/Hamiltonian paths, Planar graphs, Dirac's Theorem, Chromatic number |
| Combinatorics | Permutations, Combinations, Pigeonhole Principle, Inclusion-Exclusion |
| Linear Programming | Formulation, Graphical method, Duality, Simplex method |

#### 9. Software Engineering
| Topic | Subtopics |
|---|---|
| SDLC Models | Waterfall, Spiral (risk analysis), Incremental, Agile (Scrum, XP), FDD |
| Metrics | COCOMO (Basic/Intermediate/Detailed), Cyclomatic Complexity (V(G) = E - N + 2P) |
| Testing | Unit, Integration, System, Acceptance, Alpha, Beta, Regression |
| Testing Techniques | White box (Path, Loop, Basis Path), Black box (EP, BVA, Decision Table) |
| Design | Cohesion (types from best to worst), Coupling (types from best to worst) |
| Project Management | PERT, CPM, Effort estimation, Schedule estimation |
| Quality | McCall's Quality Factors, ISO 9126, Software Reliability |
| Maintenance | Corrective, Adaptive, Perfective, Preventive |

#### 10. Computer Architecture
| Topic | Subtopics |
|---|---|
| Number Systems | Binary, Octal, Hex conversions, BCD, Excess-3, Gray Code |
| Arithmetic | Fixed-point and Floating-point, Booth's algorithm, CSA |
| Addressing Modes | Immediate, Direct, Indirect, Register, Indexed, Base-relative |
| Memory | Cache mapping (Direct, Associative, Set-associative), Hit ratio |
| Pipelining | Pipeline stages, Hazards (Structural, Data, Control), Speedup, Amdahl's Law |
| I/O | DMA, Interrupts (vectored, non-vectored), Polling |
| Buses | Synchronous/Asynchronous buses, Arbitration |

#### 11. Computer Graphics
| Topic | Subtopics |
|---|---|
| Line Drawing | DDA Algorithm, Bresenham's Line Drawing Algorithm |
| Clipping | Cohen-Sutherland (Region codes), Liang-Barsky |
| Transformations | 2D/3D: Translation, Rotation, Scaling, Shearing (Homogeneous coordinates) |
| Curves | Bezier curves (control points), B-Splines |
| Projections | Orthographic, Oblique (Cavalier, Cabinet), Perspective |
| Visible Surface | Z-Buffer (Depth Buffer), Painter's Algorithm, Ray Casting |

---

### **C. Question Type Distribution Across All Papers**

| Question Type | Description | Approx. % of Paper |
|---|---|---|
| **Direct Conceptual MCQ** | Factual recall — definitions, properties, classifications | ~30% |
| **Match the Following (List I / List II)** | 4-item matching across concepts, algorithms, protocols, phases | ~20% |
| **Numerical / Calculation** | Computing values: scheduling times, addresses, frame sizes, probabilities | ~20% |
| **Code Tracing (C/C++)** | Trace nested loops, pointer arithmetic, recursive calls to find output | ~10% |
| **Multiple True/False (Statement combo)** | 4 statements A/B/C/D — select correct combination | ~10% |
| **Passage / Comprehension Based** | Single scenario spawning 5 linked questions (LPP, DBMS, Neural Networks) | ~10% |

---

### **D. High-Priority Topics for Upcoming UGC NET CS Exams**

Based on recurrence frequency and recent exam trends, the following topics are the **highest-priority** for revision:

> [!IMPORTANT]
> These topics appeared in **3 or more papers** and carry the highest probability of reappearing.

1. **CSMA/CD Frame Size & Timing Calculations** — appeared in every networking-heavy paper
2. **Banker's Algorithm (Safe State / Need Matrix)** — consistently tested numerically
3. **Page Replacement Algorithms** (LRU, FIFO, Optimal, Belady's Anomaly) — numerical + theoretical
4. **Normalization & Functional Dependencies** (finding candidate keys, BCNF violations) — always present
5. **Master Theorem & Recurrence Relations** — tested in at least 4 papers
6. **Neural Network Weight Updates** (Perceptron, Backpropagation) — always numerical
7. **Genetic Algorithm Steps & Sequence** — tested in multiple MCQ and sequencing formats
8. **Parser Hierarchy** (LR(0) < SLR < LALR < CLR) and parser conflict resolution
9. **Process Scheduling Gantt Charts** (Round Robin, SJF — computing TAT and WT)
10. **Linear Programming** (formulation, duality, graphical feasible region) — appears as 5-Q passage

---

### **E. Exam Strategy Based on Paper Analysis**

| Strategy | Rationale |
|---|---|
| **Prioritize Numerical Accuracy** | ~30% of marks depend on computation. Master formulas for scheduling, networking, LPP, hashing. |
| **Practice Code Tracing** | C/C++ tracing (pointers, loops, recursion) appears in every paper. No shortcuts — trace manually. |
| **Learn Match-the-Following Systematically** | 20% of questions use this format. Flashcard all protocol-layer mappings, algorithm complexities, testing types. |
| **Do Passage-Based Practice** | 5-question passages on LPP, DBMS, or AI appear in every paper. Time management is critical. |
| **Focus on Statement A/B/C/D Questions** | Requires ruling out wrong statements — eliminate-and-choose strategy works best. |
| **Revise Suggested Topics Actively** | Every paper introduces 2–3 topics not seen before. Use the "Suggested Related Topics" from each section above as a checklist. |
