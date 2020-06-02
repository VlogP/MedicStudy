using System;
using System.Collections.Generic;
using System.Text;
using FinalltechArt.DB.Models;
using System.Linq;
using DataTransferObject;

namespace FinalltechArt.DB.Interfaces
{
   public interface IPatientRepository: IBaseRepository<Patient>
    {
        IEnumerable<PatientTableViewDTO> GetAllSponsor();
        IEnumerable<PatientTableViewDTO> GetAllResearcher(string IdClinic);
        bool Check(int IdPatient);
        PatientDTO GetFullInfoOne(int Id);
        Patient CheckStatus(int IdPatient);
    }
}
