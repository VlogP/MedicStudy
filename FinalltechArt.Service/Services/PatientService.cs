using System;
using System.Collections.Generic;
using System.Text;
using DataTransferObject;
using FinalltechArt.DB.Models;
using FinalltechArt.DB.DBRepository;
using FinalltechArt.Service.Interfaces;
namespace FinalltechArt.Service.Services
{
   public class PatientService:IPatientService
    {
        UserRepository UserRep;
        PatientRepository PatientRep;
        VisitRepository VisitRep;
        DrugRepository DrugRep;
        public PatientService(RepositoryContext context)
        {
            UserRep = new UserRepository(context);
            PatientRep = new PatientRepository(context);
            VisitRep = new VisitRepository(context);
            DrugRep = new DrugRepository(context);
        }

       public IEnumerable<PatientTableViewDTO> GetAllSponsorPatients()
        {
           return PatientRep.GetAllSponsor();
        }

       public IEnumerable<PatientTableViewDTO> GetAllResearcherPatients(int IdResearcher)
        {
            string ClinicId = UserRep.FindUserById(IdResearcher).ClinicId;
            return PatientRep.GetAllResearcher(ClinicId);
        }

        public bool AddPatient(Patient patient, int ResearcherId)
        {          
            string ClinicId = UserRep.FindUserById(ResearcherId).ClinicId;

            if (!PatientRep.Check(ClinicId + "-" + patient.PatientId))
                return false;
            patient.ClinicId = ClinicId;
            patient.PatientId = ClinicId + "-" + patient.PatientId;
            patient.Status = "Screening";

            Visit visit = new Visit { PatientId = patient.PatientId, VisitDate = DateTime.Now.ToShortDateString() };
            PatientRep.Add(patient);
            VisitRep.Add(visit);
            VisitRep.Save();

            return true;
        }

      public PatientDTO GetFullInfoOne(string Id)
        {
            return PatientRep.GetFullInfoOne(Id);
        }

        public bool NotFullCompleteResearch(string Id)
        {
            Patient patient = PatientRep.CheckStatus(Id);
            if (patient?.Status == "Not full end" || patient?.Status == "Full end")
                return false;

            patient.Status = "Not full end";
            PatientRep.Save();

            return true;
        }

        public bool RegisterNewVisit(string Id,int ResearcherId)
        {
            Patient patient = PatientRep.CheckStatus(Id);
            
            if (patient?.Status==null|| patient?.Status == "Not full end" || patient?.Status == "Full end")
                return false;
            
           

            DataCountDrugType AvailableDrugs = new DataCountDrugType();
            DataCountDrugType VisitDrug = new DataCountDrugType();

            AvailableDrugs.ClinicId = patient.ClinicId;

            VisitDrug.ClinicId = patient.ClinicId;
            
            DrugRep.CountDrugTypesInClinic(AvailableDrugs);


            Visit NewVisit = new Visit
            {
                PatientId = Id,
                VisitDate = DateTime.Now.ToShortDateString()
            };


           
            VisitRep.Add(NewVisit);
            VisitRep.Save();


           
               int Choise=new Random().Next(0,3);

            if (patient.Status == "Randomized")
            {
                if (patient.DrugType == "A") Choise = 0;
                if (patient.DrugType == "B") Choise = 1;
                if (patient.DrugType == "C") Choise = 2;
            }
        
           
                if (Choise == 0)
                {
                    if (AvailableDrugs.CountTypeA == 0) return false;
                }
                if (Choise == 1)
                {
                    if (AvailableDrugs.CountTypeB == 0) return false;
                }
                if (Choise == 2)
                {
                    if (AvailableDrugs.CountTypeC == 0) return false;
                }
            
          
              
            

            switch (Choise)
            {
                case 0:
                    VisitDrug.CountTypeA = AvailableDrugs.CountTypeA;
                    DrugRep.TakeDrugToVisit(VisitDrug, NewVisit.VisitId);
                    break;

                case 1:
                    VisitDrug.CountTypeB = AvailableDrugs.CountTypeB;
                    DrugRep.TakeDrugToVisit(VisitDrug, NewVisit.VisitId);
                    break;

                case 2:
                    VisitDrug.CountTypeC = AvailableDrugs.CountTypeC;
                    DrugRep.TakeDrugToVisit(VisitDrug, NewVisit.VisitId);
                    break;
            }


            patient.DrugType = ((DataObject.DrugType)Choise).ToString();
            patient.Status = "Randomized";
            DrugRep.Save();
            PatientRep.Save();
            return true;
        }




    }
}
