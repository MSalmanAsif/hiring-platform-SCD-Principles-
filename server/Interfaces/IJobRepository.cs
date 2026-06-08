using HiringPlatform.Models;

namespace HiringPlatform.Interfaces
{
    public interface IJobRepository
    {
        List<Job> GetAll();
        Job? GetById(string id);
        void Add(Job job);
        void Update(Job job);
        void Delete(string id);
    }
}