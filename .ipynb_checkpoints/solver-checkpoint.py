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
  { x: 158, y: 24 },
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