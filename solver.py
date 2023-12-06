from pulp import LpProblem, LpMinimize, LpVariable, lpSum

# Create the 'prob' variable to contain the problem data
prob = LpProblem("Car Problem", LpMinimize)

# Variables
forw = LpVariable("forw", 0, 1, cat='Integer')  # binary variable
left = LpVariable("left", 0, 1, cat='Integer')  # binary variable
rite = LpVariable("rite", 0, 1, cat='Integer')  # binary variable
sped = LpVariable("sped", 0, 0.8)
angl = LpVariable("angl", -10000, 10000)
turn = LpVariable("turn", 0.02, 0.1)
carx = LpVariable("carx", 0, 1000)
cary = LpVariable("cary", 0, 1000)

# The objective function is added to 'prob' first
# Assuming 'dist' is a function of the variables
dist = # Define your distance function here
prob += dist, "Total Distance"

# Constraints
# Add your constraints here

# The problem is solved using PuLP's choice of Solver
prob.solve()

from scipy.optimize import minimize
import numpy as np

const track1 = [
  { x: 81, y: 196 },
  { x: 108, y: 210 },
  { x: 152, y: 216 },
  { x: 182, y: 185 },
  { x: 190, y: 159 },
  { x: 198, y: 122 },
  { x: 226, y: 93 },
  { x: 224, y: 41 },
  { x: 204, y: 15 },
  { x: 158, y: 24 },{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 5,
   "id": "4dfba7bb-7e3c-487f-8751-a87d069c75ff",
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "\n",
      "Solution for S:\n",
      "[[ 0.17127556 -0.27712668  0.11835316 -0.06624765]\n",
      " [-0.27712668  4.34475937 -1.00805287  0.73674196]\n",
      " [ 0.11835316 -1.00805287  0.37715234 -0.21279819]\n",
      " [-0.06624765  0.73674196 -0.21279819  0.14559073]]\n"
     ]
    }
   ],
   "source": [
    "import numpy as np\n",
    "import control as ctrl\n",
    "\n",
    "mc = 0.2\n",
    "mp = 0.5\n",
    "l = 0.5\n",
    "g = 9.80364\n",
    "\n",
    "A = np.array([[0, 0, 1, 0],\n",
    "              [0, 0, 0, 1],\n",
    "              [0, mp * g / mc, 0, 0],\n",
    "              [0, (mc + mp) * g / (mc * l), 0, 0]])\n",
    "\n",
    "B = np.array([[0], [0], [1 / mc], [1 / (mc * l)]])\n",
    "\n",
    "Q = np.diag([1 / 20, mp * g * l, 1 / 2 * (mc + mp), 1 / 2 * mp * l * l])\n",
    "Q[2, 3] = 1 / 2 * mp * l\n",
    "Q[3, 2] = Q[2, 3]\n",
    "\n",
    "R = np.array([[1 / 10]])\n",
    "\n",
    "K, S, E = ctrl.lqr(A, B, Q, R)\n",
    "\n",
    "print(\"\\nSolution for S:\")\n",
    "print(S)\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "id": "cfad91d2-b804-4fa2-a064-576dfc0be522",
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3 (ipykernel)",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.11.5"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 5
}

  { x: 146, y: 52 },
  { x: 157, y: 93 },
  { x: 124, y: 129 },
  { x: 83, y: 104 },
  { x: 77, y: 62 },
  { x: 40, y: 57 },
  { x: 21, y: 83 },
  { x: 33, y: 145 },
  { x: 30, y: 198 },
  { x: 48, y: 210 },
];

# Define the objective function
def objective(x):
    forw, left, rite = x
    sped = c.s + 0.028*forw - 0.02
    turn = 0.1 - (sped / 0.8) * 0.08
    angl = c.a + turn*(rite - left)
    carx = c.p.x + sped * np.cos(angl)
    cary = c.p.y + sped * np.sin(angl)
    crnr = [carx + 3 * np.cos(angl) + 2 * np.sin(angl), cary + 3 * np.sin(angl) - 2 * np.cos(angl)]
    dist = np.linalg.norm(np.array(crnr) - np.array([curGon[1], curGon[2]]))
    return dist

# Initial guess
x0 = [0, 0, 0]

# Define the bounds
bnds = [(0, 1), (0, 1), (0, 1)]

# Solve the optimization problem
solution = minimize(objective, x0, bounds=bnds)

# Print the solution
print(solution.x)