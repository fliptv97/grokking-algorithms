states_needed = set(['mt', 'wa', 'or', 'id', 'nv', 'ut', 'ca', 'az'])
final_stations = set()

stations = {
    'kone': set(['id', 'nv', 'ut']),
    'ktwo': set(['wa', 'id', 'mt']),
    'kthree': set(['or', ' nv', 'ca']),
    'kfour': set(['nv', 'ut']),
    'kfive': set(['ca', 'az'])
}

while states_needed:
    best_station = None
    states_covered = set()

    for station, states in stations.items():
        covered = states_needed & states

        if len(covered) > len(states_covered):
            best_station = station
            states_covered = covered

    final_stations.add(best_station)

    states_needed -= states_covered

print(final_stations)
