from chromadb.utils import embedding_functions

embedder = embedding_functions.DefaultEmbeddingFunction()

documents = ["Chad"]

print(embedder(documents)[0].tolist())


#Write an endpoint that accepts any string and maps to its embedded vector.
#Return this vector as a list.
#Modify the front end so that there is box the user can type text into.
#The user can submit the text, and the embedded vector will be displayed.