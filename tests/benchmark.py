"""
Performance benchmark for the moderation system
"""
import time
import statistics
import asyncio
import httpx
from typing import List, Dict

API_URL = "http://localhost:8000"

# Test messages with various characteristics
TEST_MESSAGES = [
    "Hello, how are you today?",
    "I disagree with your point",
    "You're absolutely wrong about this",
    "That's a terrible idea",
    "I hate you and everything you stand for",
    "Your work is subpar and needs improvement",
    "This is completely unacceptable behavior",
    "You should be ashamed of yourself",
    "I know where you live",
    "Go back to where you came from",
]


async def measure_single_request_latency(client: httpx.AsyncClient, text: str) -> float:
    """Measure latency of a single moderation request"""
    start_time = time.time()
    
    try:
        response = await client.post(
            f"{API_URL}/api/v1/moderate",
            json={"text": text, "check_only": True},
            timeout=30.0
        )
        response.raise_for_status()
        
        latency = (time.time() - start_time) * 1000  # Convert to ms
        return latency
        
    except Exception as e:
        print(f"Error in request: {e}")
        return -1


async def measure_concurrent_requests(
    num_concurrent: int,
    num_requests: int
) -> Dict[str, float]:
    """Measure performance under concurrent load"""
    print(f"\n{'='*60}")
    print(f"Benchmark: {num_concurrent} concurrent requests, {num_requests} total")
    print(f"{'='*60}")
    
    latencies = []
    errors = 0
    
    async with httpx.AsyncClient() as client:
        start_time = time.time()
        
        # Create batches of concurrent requests
        for batch_start in range(0, num_requests, num_concurrent):
            batch_size = min(num_concurrent, num_requests - batch_start)
            
            # Create tasks for this batch
            tasks = []
            for i in range(batch_size):
                text = TEST_MESSAGES[i % len(TEST_MESSAGES)]
                tasks.append(measure_single_request_latency(client, text))
            
            # Execute batch concurrently
            batch_results = await asyncio.gather(*tasks)
            
            # Collect results
            for latency in batch_results:
                if latency > 0:
                    latencies.append(latency)
                else:
                    errors += 1
        
        total_time = time.time() - start_time
    
    # Calculate statistics
    if latencies:
        stats = {
            "total_requests": num_requests,
            "successful_requests": len(latencies),
            "failed_requests": errors,
            "total_time_seconds": total_time,
            "requests_per_second": len(latencies) / total_time,
            "mean_latency_ms": statistics.mean(latencies),
            "median_latency_ms": statistics.median(latencies),
            "min_latency_ms": min(latencies),
            "max_latency_ms": max(latencies),
            "p95_latency_ms": sorted(latencies)[int(len(latencies) * 0.95)],
            "p99_latency_ms": sorted(latencies)[int(len(latencies) * 0.99)],
            "stdev_latency_ms": statistics.stdev(latencies) if len(latencies) > 1 else 0
        }
    else:
        stats = {
            "total_requests": num_requests,
            "successful_requests": 0,
            "failed_requests": errors,
            "error": "No successful requests"
        }
    
    # Print results
    print("\nResults:")
    print(f"  Total requests: {stats.get('total_requests', 0)}")
    print(f"  Successful: {stats.get('successful_requests', 0)}")
    print(f"  Failed: {stats.get('failed_requests', 0)}")
    
    if "mean_latency_ms" in stats:
        print(f"\n  Total time: {stats['total_time_seconds']:.2f}s")
        print(f"  Throughput: {stats['requests_per_second']:.2f} req/s")
        print(f"\n  Latency:")
        print(f"    Mean: {stats['mean_latency_ms']:.2f}ms")
        print(f"    Median: {stats['median_latency_ms']:.2f}ms")
        print(f"    Min: {stats['min_latency_ms']:.2f}ms")
        print(f"    Max: {stats['max_latency_ms']:.2f}ms")
        print(f"    P95: {stats['p95_latency_ms']:.2f}ms")
        print(f"    P99: {stats['p99_latency_ms']:.2f}ms")
        print(f"    StdDev: {stats['stdev_latency_ms']:.2f}ms")
    
    return stats


async def test_batch_endpoint_performance(batch_size: int, num_batches: int):
    """Test performance of batch endpoint"""
    print(f"\n{'='*60}")
    print(f"Batch Endpoint Benchmark: {batch_size} messages x {num_batches} batches")
    print(f"{'='*60}")
    
    async with httpx.AsyncClient() as client:
        latencies = []
        total_messages = 0
        
        start_time = time.time()
        
        for batch_num in range(num_batches):
            # Create batch request
            messages = [
                {
                    "id": f"msg_{batch_num}_{i}",
                    "text": TEST_MESSAGES[i % len(TEST_MESSAGES)]
                }
                for i in range(batch_size)
            ]
            
            batch_start = time.time()
            
            try:
                response = await client.post(
                    f"{API_URL}/api/v1/moderate/batch",
                    json={"messages": messages},
                    timeout=60.0
                )
                response.raise_for_status()
                
                batch_latency = (time.time() - batch_start) * 1000
                latencies.append(batch_latency)
                total_messages += batch_size
                
            except Exception as e:
                print(f"Error in batch {batch_num}: {e}")
        
        total_time = time.time() - start_time
    
    # Calculate statistics
    if latencies:
        print("\nResults:")
        print(f"  Total batches: {num_batches}")
        print(f"  Batch size: {batch_size}")
        print(f"  Total messages: {total_messages}")
        print(f"  Total time: {total_time:.2f}s")
        print(f"  Messages per second: {total_messages / total_time:.2f}")
        print(f"\n  Batch Latency:")
        print(f"    Mean: {statistics.mean(latencies):.2f}ms")
        print(f"    Median: {statistics.median(latencies):.2f}ms")
        print(f"    Min: {min(latencies):.2f}ms")
        print(f"    Max: {max(latencies):.2f}ms")


async def main():
    """Run all benchmarks"""
    print("URBEX Content Moderation - Performance Benchmark")
    print("="*60)
    
    # Check if server is running
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{API_URL}/health", timeout=5.0)
            response.raise_for_status()
            print("✓ Server is running")
    except Exception as e:
        print(f"✗ Server is not accessible: {e}")
        print(f"Please start the server with: uvicorn app.main:app")
        return
    
    # Run benchmarks
    print("\nRunning benchmarks...\n")
    
    # 1. Sequential requests (baseline)
    await measure_concurrent_requests(num_concurrent=1, num_requests=10)
    
    # 2. Low concurrency
    await measure_concurrent_requests(num_concurrent=5, num_requests=50)
    
    # 3. Medium concurrency
    await measure_concurrent_requests(num_concurrent=10, num_requests=100)
    
    # 4. High concurrency
    await measure_concurrent_requests(num_concurrent=20, num_requests=100)
    
    # 5. Batch endpoint
    await test_batch_endpoint_performance(batch_size=10, num_batches=10)
    
    print(f"\n{'='*60}")
    print("Benchmark complete!")
    print(f"{'='*60}")


if __name__ == "__main__":
    asyncio.run(main())
