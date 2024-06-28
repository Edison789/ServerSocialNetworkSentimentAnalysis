import requests
import re
from gensim.corpora.dictionary import Dictionary
from gensim.models import LdaModel
import nltk
from nltk.corpus import stopwords

# Descargar los stopwords si no están ya descargados
nltk.download('stopwords')

# Lista de stopwords en español
stop_words = set(stopwords.words('spanish'))

# Función para limpiar y preprocesar el texto
def limpiar_texto(texto):
    # Dividir las frases unidas en palabras
    texto = re.sub(r'([a-z])([A-Z])', r'\1 \2', texto)  # Añadir un espacio entre palabras unidas
    # Convertir a minúsculas
    texto = texto.lower()
    # Eliminar puntuación
    texto = re.sub(r'[^\w\s]', '', texto)
    # Eliminar palabras con menos de 3 caracteres y stop words
    texto = ' '.join([palabra for palabra in texto.split() if len(palabra) >= 3 and palabra not in stop_words])
    return texto

# Paso 1: Realizar la llamada a la API
api_url = "http://localhost:3001/api/facebook/comments/keyPhrases"
response = requests.get(api_url)
data = response.json()

# Verificar que la solicitud fue exitosa
if response.status_code != 200 or data['status'] != 'OK':
    raise Exception("Error al obtener los datos de la API")

# Paso 2: Procesar los datos obtenidos de la API
key_phrases = []
for comment in data['data']:
    for phrase in comment['keyPhrases']:
        # Limpiar y preprocesar la frase
        frase_limpia = limpiar_texto(phrase['Text'])
        key_phrases.extend(frase_limpia.split())  # Dividir las frases limpias en palabras individuales y añadir a la lista

# Crear el arreglo de palabras preprocesadas (listas de listas de palabras)
palabras_preprocesadas = [key_phrases]
#print(key_phrases)
# Crear diccionario
diccionario = Dictionary(palabras_preprocesadas)

# Crear corpus (matriz documento-término)
corpus = [diccionario.doc2bow(texto) for texto in palabras_preprocesadas]
# Paso 3: Aplicar LDA
num_temas = 2
modelo_lda = LdaModel(corpus, num_topics=num_temas, id2word=diccionario, passes=10)

# Si quieres ver los términos y su relevancia en cada tema:
for idx, tema in modelo_lda.show_topics(formatted=False):
    print("Tema: {} \nPalabras: {}".format(idx, [palabra[0] for palabra in tema]))
