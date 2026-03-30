from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

vector_db = None

def process_pdf(file_path):
    global vector_db

    try:
        print("📄 Loading PDF:", file_path)

        loader = PyPDFLoader(file_path)
        docs = loader.load()

        print("✅ Pages loaded:", len(docs))

        # 🔥 CHECK EMPTY DOCS
        if not docs:
            raise Exception("PDF has no readable content")

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=50
        )
        chunks = splitter.split_documents(docs)

        print("✅ Chunks created:", len(chunks))

        # 🔥 FIX: HANDLE EMPTY CHUNKS
        if len(chunks) == 0:
            raise Exception("No text chunks extracted from PDF (possibly scanned PDF)")

        embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        vector_db = FAISS.from_documents(chunks, embeddings)

        print("✅ Vector DB created")

        return "PDF processed successfully"

    except Exception as e:
        print("🔥 RAG ERROR:", e)
        raise e
    
def query_pdf(query):
    global vector_db

    if vector_db is None:
        return None

    docs = vector_db.similarity_search(query, k=3)

    return "\n\n".join([doc.page_content for doc in docs])