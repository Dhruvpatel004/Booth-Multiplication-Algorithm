Booth algorithm gives a procedure for multiplying binary
integers in signed 2’s complement representation in efficient
way, i.e., less number of additions/subtractions required.
•
It operates on the fact that strings of 0’s in the multiplier require
no addition but just shifting and a string of 1’s in the multiplier
from bit weight 2^k to weight 2^m can be treated as 2^(k+1 ) to
2^m.
•
Example: (+14) is represented as 001110 has string of 1’s from
2 3 to 2 1
Here K=3,m=1
(+14) can be represented as 2
k+1 2 m= 2 4 2 1 =16 2=14.
MX14 = MX2
4 MX2 1

As in all multiplication schemes, booth algorithm requires
examination of the multiplier bits and shifting of the partial
product.
•
Prior to the shifting, the multiplicand may be added to the partial
product, subtracted from the partial product, or left unchanged
according to following rules:
•
The multiplicand is subtracted from the partial product upon
encountering the first least significant 1 in a string of 1’s in the multiplier
•
The multiplicand is added to the partial product upon encountering the
first 0 (provided that there was a previous ‘1’) in a string of 0’s in the
multiplier.
•
The partial product does not change when the multiplier bit is identical
to the previous multiplier bit.


