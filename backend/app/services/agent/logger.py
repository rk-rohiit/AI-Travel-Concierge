import time

def log_start(tool_name):
    return time.time()

def log_end(tool_name, start_time):
    duration = time.time() - start_time
    print(f"[LOG] {tool_name} took {duration:.2f}s")