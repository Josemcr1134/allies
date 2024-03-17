import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AnamnesisService } from '../../../services/anamnesis.service';
import Swal from 'sweetalert2';
import { AppointmentsService } from '../../../services/appointments.service';
import { MedicineOrder } from 'src/app/models/medicine-order.model';
import { VademecumService } from '../../../services/vademecum.service';
import { InhabilityService } from '../../../services/inhability.service';
import { AllieServicesService } from '../../../services/allie-services.service';

@Component({
  selector: 'app-medical-record-dates',
  templateUrl: './medical-record-dates.component.html',
  styleUrls: ['./medical-record-dates.component.css']
})
export class MedicalRecordDatesComponent implements OnInit {
  public internal_notes:string = '';
  public reason_for_consultation:string = '';
  public recommendations:string = '';
  public diagnosis:string = '';
  public analysis_and_plan:string = '';
  public observations:string = '';
  public appointment_id:string = '';
  public affiliate_name:string = '';
  public affiliate_gender:string = '';
  public affiliate_document:number = 0;
  public affiliate_avatar:string = '';
  public findings:string = '';
  public Medicines:MedicineOrder [] = [];
  public vademecum:string = '';
  public quantity: number = 0;
  public every: string = '';
  public during: string = '';
  public Vademecums:any[] = [];
  public start_date:string ='';
  public end_date:string ='';
  public generateInhability:boolean = false;
  public loading:boolean = false;
  public docOrders:any[]= [];
  public diagnosticImpresion:string = '';
  public laterality:string = '';
  public anamnesisOrder:any;

  public CIE10:any[] = [];
  public limitCIE10:number = 5;
  public pageCIE10:number = 1;
  public offsetCIE10:number = 0;
  public nextCIE10:any;
  public previousCIE10:any;
  public DiagnosticsImpressions:any[] = [];
  public diagnosticsImpression:string = '';

  public limitUnitMeasure:number = 100;
  public pageUnitMeasure:number = 1;
  public offsetUnitMeasure:number = 0;
  public nextUnitMeasure:any;
  public previousUnitMeasure:any;
  public UnitMeasures:any[] = [];
  public UnitMeasure:string = '';

  public limitTimeMeasure:number = 100;
  public pageTimeMeasure:number = 1;
  public offsetTimeMeasure:number = 0;
  public nextTimeMeasure:any;
  public previousTimeMeasure:any;
  public TimeMeasures:any[] = [];
  public TimeMeasure:string = '';

  public limitPeriodMeasure:number = 100;
  public pagePeriodMeasure:number = 1;
  public offsetPeriodMeasure:number = 0;
  public nextPeriodMeasure:any;
  public previousPeriodMeasure:any;
  public PeriodMeasures:any[] = [];
  public PeriodMeasure:string = '';

  public limitViaMeasure:number = 100;
  public pageViaMeasure:number = 1;
  public offsetViaMeasure:number = 0;
  public nextViaMeasure:any;
  public previousViaMeasure:any;
  public ViaMeasures:any[] = [];
  public ViaMeasure:string = '';

  public limitLateralities:number = 100;
  public pageLateralities:number = 1;
  public offsetLateralities:number = 0;
  public nextLateralities:any;
  public previousLateralities:any;
  public Lateralities:any[] = [];
  public Laterality:string = '';
  public successDocUpload:any = false;


  public service_type:string = '';
  public service:string ='';
  public aids_observations:string = '';
  public incapacity_observations:string = '';
  public appointment:string = '';
  public sendAidsAndOrder:boolean = false;
  public serviceTypes:any[] = [];
  public services:any[] = [];
  public sendedAidsAndOrders:boolean = false;
  public sendedInhability:boolean = false;
  public sendedAnamnesis:boolean = false;
  constructor(private alliesSvc:AllieServicesService ,private anamnesisSvc:AnamnesisService,private appointmentSvc:AppointmentsService,private VademecumSvc:VademecumService,private inhabilitySvc:InhabilityService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id}) => {
      this.appointment_id = id;
    });
    this.GetAppointmentByID();
    this.GetVademecums();
    this.GetCIE10();
    this.GetLateralities();
    this.GetPeriodMeasure();
    this.GetUnitMeasure();
    this.GetViaMeasure();
    this.GetTimeMeasure();
    this.successDocUpload = localStorage.getItem('DocUpload') || 'false'  ;
    this.GetServicesType();
  }



  NewAnamnesis(){
    this.loading = !this.loading;
    const body = {
     internal_notes:this.internal_notes,
     reason_for_consultation:this.reason_for_consultation,
     recommendations:this.recommendations,
     diagnosis:this.diagnosis,
     analysis_and_plan:this.analysis_and_plan,
     observations:this.observations,
     appointment: this.appointment_id,
     cie10: this.CIE10
    };

    this.anamnesisSvc.NewAnamnesis(body)
            .subscribe({
              error:(err:any) => {
                this.loading = !this.loading;

                console.log(err, body);
                Swal.fire('Ooooops', 'No se ha podido guardar información, diligencie los campos faltantes','warning');
              },
              next:(resp:any) => {
                this.loading = !this.loading;
                this.sendedAnamnesis = !this.sendedAnamnesis;
                Swal.fire('Éxito', 'Anamnesis completada', 'success');
              }
            })

  };

  NewAnamnesisDocument(){
      const fd = new FormData();
      fd.append('appointment', this.appointment_id);
      fd.append('document', this.anamnesisOrder);

      this.anamnesisSvc.NewAnamnesisDoc(fd)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                  Swal.fire('Oooops', 'No se ha podido cargar el archivo, el tamaño supera el limite permitido', 'warning');
                },
                next:(resp):any => {
                  console.log(resp);
                  Swal.fire('Éxito', 'se ha cargado el archivo , de manera exitosa', 'success');
                  localStorage.setItem('DocUpload', 'true');
                  this.successDocUpload = 'true';
                  this.successDocUpload = !this.successDocUpload;
                  this.sendedAnamnesis = !this.sendedAnamnesis;

                }
              });
  };

  CompleteAppointemt(){
    const body = {
      status:'ATTENDED'
    };
    this.appointmentSvc.CompleteAppointment(body, this.appointment_id)
            .subscribe({
              error:(err:any) => {
                this.loading = !this.loading;

                console.log(err);
                Swal.fire('Ooooops', 'No pudimos completar la cita, revisa los campos','warning');
              },
              next:(resp:any) => {
                this.loading = !this.loading;
                Swal.fire('Éxito', 'Cita ha sido finalizada', 'success');
                 this.router.navigateByUrl('/Home/Dates/AllDates');
                 localStorage.removeItem('successDocUpload')
              }
            });
  };

  NewVademecumAppointment(){
    this.loading = !this.loading;
    const newMedicine:MedicineOrder = {
      appointment: this.appointment_id,
      medicine: this.vademecum,
      quantity: this.quantity,
      unit_measure: this.UnitMeasure,
      every: this.every,
      time_measure: this.TimeMeasure,
      during: this.during,
      period_measure: this.PeriodMeasure,
      via_measure: this.ViaMeasure,
      observations: this.observations,
      recommendations: this.recommendations,
    };
    this.VademecumSvc.SendVademecumsForAppointment(newMedicine)
            .subscribe({
              error:(err:any) => {
                console.log(err , newMedicine);
                this.loading = !this.loading;

                Swal.fire('Ooooops', 'No pudimos cargar este medicamento, revisa los campos','warning');
              },
              next:(resp:any) => {
                  this.loading = !this.loading;
                  this.Medicines.push(newMedicine);
                  this.vademecum = '';
                  this.quantity = 0;
                  this.UnitMeasure = '';
                  this.every = '';
                  this.TimeMeasure = '';
                  this.during = '';
                  this.PeriodMeasure = '';
                  this.ViaMeasure = '';
              }
            });
  }

  NewInhability(){
    this.loading = !this.loading;

    const body = {
      start_date: this.start_date,
      end_date: this.end_date,
      appointment: this.appointment_id,
      observations:this.incapacity_observations
    };

    this.inhabilitySvc.NewInhability(body)
              .subscribe({
                error:(err:any) => {
                  console.log(err, body);
                  this.loading = !this.loading;
                  Swal.fire('Ooooops', 'No se ha podido guardar la incapacidad, diligencie toda la información','warning');
                },
                next:(resp:any) => {
                  console.log(resp)
                  this.loading = !this.loading;

                  this.generateInhability = !this.generateInhability;
                  this.sendedInhability = !this.sendedInhability;
                  Swal.fire('Éxito', 'Recuerde que esta incapacidad no es valida en su EPS','success');

                }
              })
  };

  SendAidsAndOrder(){
    this.loading = !this.loading;

    const body = {
      service_type: this.service_type,
      service:this.service,
      observations:this.aids_observations,
      appointment:this.appointment_id
    };

    this.appointmentSvc.SendAidAndOrders(body)
              .subscribe({
                error:(err:any) => {
                  console.log(err);
                  Swal.fire('Oooops', 'No pudimos enviar esta información, revisa los campos', 'warning');
                  this.loading = !this.loading;

                },
                next:(resp:any) => {
                  console.log(resp);
                  Swal.fire('Éxito', 'Servicio y observaciones enviadas', 'success');
                  this.sendAidsAndOrder = !this.sendAidsAndOrder;
                  this.loading = !this.loading;

                  this.sendedAidsAndOrders = !this.sendedAidsAndOrders;
                }
              })

  }

  GetAppointmentByID(){
    this.appointmentSvc.GetAppointmentById(this.appointment_id)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.affiliate_name = `${resp.user.first_name} ${resp.user.last_name}`;
                this.affiliate_gender = `${resp.user.gender}`;
                this.affiliate_document = resp.user.document;
                this.affiliate_avatar = resp.user.avatar;
              }
            });
  };

  DeleteMedicine(m:any){
    this.Medicines = this.Medicines.filter(ms => ms !== m);
  };

  GetVademecums(){
    this.VademecumSvc.GetVademecums()
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
               next:(resp:any) => {
                this.Vademecums = resp.results;
               }
            })
  };

  onSelectDoc(event:any) {
    this.docOrders.push(...event.addedFiles);
    this.anamnesisOrder = this.docOrders[0]
  };

  onRemovedocOrders(event:any) {
    this.docOrders.splice(this.docOrders.indexOf(event), 1);
  };

  AddCIE10(){
    const data = {
      diagnostic_impression: this.diagnosticImpresion,
      laterality:this.laterality
    };
    this.CIE10.push(data);

    this.diagnosticImpresion = '';
    this.laterality = '';


  };

  GetCIE10(){
    this.VademecumSvc.GetCIE10(this.limitCIE10, this.offsetCIE10)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.nextCIE10 = resp.next;
                this.previousCIE10 = resp.previous;
                this.DiagnosticsImpressions = resp.results;
              }
            });
  };

  PaginationCIE10(value:number){
    this.pageCIE10 += value;

    if(this.pageCIE10 > 0){
      this.offsetCIE10 = (this.limitCIE10 * this.pageCIE10) -  this.limitCIE10;
    } else if(this.pageCIE10 <  1){
      this.pageCIE10 === 1;
    } else if(this.DiagnosticsImpressions.length === 0){
      this.offsetCIE10 = (this.limitCIE10 * (this.pageCIE10 - 1)) -  this.limitCIE10;
    };
    this.GetCIE10();
  };

  GetUnitMeasure(){
    this.VademecumSvc.GetUnitMeasure(this.limitUnitMeasure, this.offsetUnitMeasure)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.nextUnitMeasure = resp.next;
                this.previousUnitMeasure = resp.previous;
                this.UnitMeasures = resp.results;
              }
            });
  };

  PaginationUnitMeasure(value:number){
    this.pageUnitMeasure += value;

    if(this.pageUnitMeasure > 0){
      this.offsetUnitMeasure = (this.limitUnitMeasure * this.pageUnitMeasure) -  this.limitUnitMeasure;
    } else if(this.pageUnitMeasure <  1){
      this.pageUnitMeasure === 1;
    } else if(this.DiagnosticsImpressions.length === 0){
      this.offsetUnitMeasure = (this.limitUnitMeasure * (this.pageUnitMeasure - 1)) -  this.limitUnitMeasure;
    };
    this.GetUnitMeasure();
  };

  GetTimeMeasure(){
    this.VademecumSvc.GetTimeMeasure(this.limitTimeMeasure, this.offsetTimeMeasure)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                console.log(resp)
                this.nextTimeMeasure = resp.next;
                this.previousTimeMeasure = resp.previous;
                this.TimeMeasures = resp.results;
              }
            });
  };

  PaginationTimeMeasure(value:number){
    this.pageTimeMeasure += value;

    if(this.pageTimeMeasure > 0){
      this.offsetTimeMeasure = (this.limitTimeMeasure * this.pageTimeMeasure) -  this.limitTimeMeasure;
    } else if(this.pageTimeMeasure <  1){
      this.pageTimeMeasure === 1;
    } else if(this.DiagnosticsImpressions.length === 0){
      this.offsetTimeMeasure = (this.limitTimeMeasure * (this.pageTimeMeasure - 1)) -  this.limitTimeMeasure;
    };
    this.GetTimeMeasure();
  };

  GetPeriodMeasure(){
    this.VademecumSvc.GetPeriodMeasure(this.limitPeriodMeasure, this.offsetPeriodMeasure)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.nextPeriodMeasure = resp.next;
                this.previousPeriodMeasure = resp.previous;
                this.PeriodMeasures = resp.results;
              }
            });
  };

  PaginationPeriodMeasure(value:number){
    this.pagePeriodMeasure += value;

    if(this.pagePeriodMeasure > 0){
      this.offsetPeriodMeasure = (this.limitPeriodMeasure * this.pagePeriodMeasure) -  this.limitPeriodMeasure;
    } else if(this.pagePeriodMeasure <  1){
      this.pagePeriodMeasure === 1;
    } else if(this.DiagnosticsImpressions.length === 0){
      this.offsetPeriodMeasure = (this.limitPeriodMeasure * (this.pagePeriodMeasure - 1)) -  this.limitPeriodMeasure;
    };
    this.GetPeriodMeasure();
  };

  GetViaMeasure(){
    this.VademecumSvc.GetViaMeasure(this.limitViaMeasure, this.offsetViaMeasure)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.nextViaMeasure = resp.next;
                this.previousViaMeasure = resp.previous;
                this.ViaMeasures = resp.results;
              }
            });
  };

  PaginationViaMeasure(value:number){
    this.pageViaMeasure += value;

    if(this.pageViaMeasure > 0){
      this.offsetViaMeasure = (this.limitViaMeasure * this.pageViaMeasure) -  this.limitViaMeasure;
    } else if(this.pageViaMeasure <  1){
      this.pageViaMeasure === 1;
    } else if(this.DiagnosticsImpressions.length === 0){
      this.offsetViaMeasure = (this.limitViaMeasure * (this.pageViaMeasure - 1)) -  this.limitViaMeasure;
    };
    this.GetViaMeasure();
  };

  GetLateralities(){
    this.VademecumSvc.GetLaterality(this.limitLateralities, this.offsetLateralities)
            .subscribe({
              error:(err:any) => {
                console.log(err);
              },
              next:(resp:any) => {
                this.nextLateralities = resp.next;
                this.previousLateralities = resp.previous;
                this.Lateralities = resp.results;
              }
            });
  };

  PaginationLateralities(value:number){
    this.pageLateralities += value;

    if(this.pageLateralities > 0){
      this.offsetLateralities = (this.limitLateralities * this.pageLateralities) -  this.limitLateralities;
    } else if(this.pageLateralities <  1){
      this.pageLateralities === 1;
    } else if(this.DiagnosticsImpressions.length === 0){
      this.offsetLateralities = (this.limitLateralities * (this.pageLateralities - 1)) -  this.limitLateralities;
    };
    this.GetLateralities();
  };

  GetServicesType(){
    this.alliesSvc.GetServiceTypes()
          .subscribe({
            error:(err:any) => {
              console.log(err);
            },
            next:(resp:any) => {
              console.log(resp);
              this.serviceTypes = resp.results;
            }
          })
  };

  GetServicesByType(){
    this.alliesSvc.GetServicesByType(this.service_type)
                .subscribe({
                  error:(err:any) => {
                    console.log(err);
                  },
                  next:(resp:any) => {
                    console.log(resp);
                    this.services = resp.results;
                  }
                })
  }


}
