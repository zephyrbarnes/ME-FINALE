from pulp import LpVariable, LpProblem, lpSum, LpMinimize, LpBinary, LpInteger, LpStatus, value

# Euclidean distance calculation function
def distance(point1, point2):
    return ((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2) ** 0.5

# Create a problem
prob = LpProblem("Traveling_Salesman", LpMinimize)

# Set up the data
# For simplicity, let's assume 5 random home locations (you can replace this with your actual data)
homes = [(2, 3), (5, 8), (8, 2), (3, 6), (9, 5)]

# Create binary decision variables
x = LpVariable.dicts("x", [(i, j) for i in range(len(homes)) for j in range(len(homes))], 0, 1, LpBinary)

# Objective function: minimize the total distance
prob += lpSum(x[(i, j)] * distance(homes[i], homes[j]) for i in range(len(homes)) for j in range(len(homes)))

# Constraints
# Ensure that each city is visited exactly once
for i in range(len(homes)):
    prob += lpSum(x[(i, j)] for j in range(len(homes))) == 1
    prob += lpSum(x[(j, i)] for j in range(len(homes))) == 1

# Subtour elimination constraints
n = len(homes)
u = LpVariable.dicts("u", range(n), 0, n-1, LpInteger)

for i in range(1, n):
    for j in range(1, n):
        if i != j:
            prob += u[i] - u[j] + n * x[(i, j)] <= n - 1

# Solve the problem
prob.solve()

# Print the results
print("Status:", LpStatus[prob.status])

for v in prob.variables():
    if v.varValue > 0:
        print(v.name, "=", v.varValue)

print("Total Distance =", value(prob.objective))
