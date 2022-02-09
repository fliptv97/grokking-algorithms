from collections import deque

graph = {
  "you": ["alice", "bob", "claire"],
  "alice": ["anuj", "peggy"],
  "bob": ["peggy"],
  "claire": ["thom", "jonny"],
  "anuj": [],
  "peggy": [],
  "thom": [],
  "jonny": []
}

def breadth_first_search(name):
  search_deque = deque()
  search_deque += graph[name]
  searched = []

  while search_deque:
    person = search_deque.popleft()

    if not person in searched:
      if person_is_seller(person):
        print(person + " is a mango seller!")

        return True
      else:
        search_deque += graph[person]
        
        searched.append(person)

  return False

def person_is_seller(name):
  return name == "jonny"

breadth_first_search("you")
