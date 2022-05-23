# Assembly-Online
## Example Fibonacci Program

MOV R0, #1 \
MOV R1, #1 \
fib: \
MOV R2, R0 \
ADD R0, R0, R1 \
MOV R1, R2 \
B print \
CMP R0, #40 \
BGT exit \
B fib \
exit: \


## Instruction Set

ADD Rx, Ry, Op - Adds the value of Rx to Ry and stores the result in Rx. \
ADDS Rx, Ry, Op - Adds the value of Rx to Ry and stores the result in Rx. Also stores the value in the CPSR (used for conditional branching). \
SUB Rx, Ry, Op - Subtracts the value of Ry from Rx and stores the result in Rx. \
SUBS Rx, Ry, Op - Subtracts the value of Ry from Rx and stores the result in Rx. Also stores the value in the CPSR \
MOV Rx, Op - Stores the value of Op in Rx. \
AND Rx, Ry, Op - Ands the value of Rx and Ry and stores the result in Rx. \
ANDS Rx, Ry, Op - Ands the value of Rx and Ry and stores the result in Rx. Also stores the value in the CPSR \
ORR Rx, Ry, Op - Ors the value of Rx and Ry and stores the result in Rx. \
ORRS Rx, Ry, Op - Ors the value of Rx and Ry and stores the result in Rx. Also stores the value in the CPSR \
CMP Rx, Ry, Op - Compares the value of Rx and Ry and stores the result in the CPSR. \
B Op - Branches to the label Op. \
BNE Op - Branches to the label Op if the value in the CPSR is not equal to 0 (2 elements compared are not equal). \
BEQ Op - Branches to the label Op if the value in the CPSR is equal to 0 (2 elements compared are equal). \
BGT Op - Branches to the label Op if the value in the CPSR is greater than 0 (1st element compared is greater). \
BLT Op - Branches to the label Op if the value in the CPSR is less than 0 (1st element compared is less). \