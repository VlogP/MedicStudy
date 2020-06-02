using System;
using System.Collections.Generic;
using System.Text;

namespace FinalltechArt.DB.Interfaces
{
   public interface IBaseRepository<T> where T : class
    {
          IEnumerable<T> GetAll();
          int Count();
          T Add(T entity);
          void Save();     
    }
}
